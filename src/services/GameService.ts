// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE BOARD COMPONENT
import {Game} from "../types/Game.ts";
import {database} from "../data/database.ts";
import {User} from "../types/User.ts";
import {CreateGameDto} from "../../backend/src/game/dto/create-game.dto.ts";

export class GameService {
    constructor() {
    }

    getGameById(id: number): Game | undefined {
        return database.games.find(it => it.id === id);
    }

    async createGame(params: CreateGameDto) {
        return await fetch('http://localhost:5555/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
    }

    // A FUNCTION WHICH ALLOWS TO DISPLAY A STATUS GAME INFO
    printStatusInfo(squares: (string | null)[][], firstUser: User, secondUser: User, winner: string | null): string {
        let status: string;

        if (winner) {
            status = `Congratulations! A winner is ${winner}`;
        } else {
            status = `The next player's move: ${firstUser.isNextTurn ? firstUser.username + ' as X' : secondUser.username + ' as O'}`;
        }

        if (squares.every((array) =>
            array.every((value) => (value !== null) && !winner))) {
            status = `Draw!`;
            firstUser.isNextTurn = true;
            secondUser.isNextTurn = true;
        }

        return status;
    }

    // A FUNCTION WHICH ALLOWS TO CALCULATE A WINNER OF THE GAME

    //todo: This method should be inside Game model
    estimateWinner(squares: (string | null) [][], firstUser: User, secondUser: User, numberToWin: number): string | null {
        let winner: string | null = null;

        if (this.estimateWinnerByRows(squares, numberToWin)) {
            winner = this.estimateWinnerByRows(squares, numberToWin);
        }
        if (this.estimateWinnerByColumns(squares, numberToWin)) {
            winner = this.estimateWinnerByColumns(squares, numberToWin);
        }
        if (this.estimateWinnerByDiagonals(squares, numberToWin)) {
            winner = this.estimateWinnerByDiagonals(squares, numberToWin);
        }

        if (winner === 'X') {
            winner = firstUser.username;
            firstUser.isNextTurn = true;
        }

        if (winner === 'O') {
            winner = secondUser.username;
            secondUser.isNextTurn = true;
        }

        return winner;
    }

    // A FUNCTION WHICH ALLOWS TO PREPARE A GAME BOARD
    //todo: this method should be private!
    //todo: This method should be inside Game model

    createBoard(numberOfRows: number, numberOfColumns: number): (string | null)[][] {
        const board: (string | null) [][] = [];

        for (let i = 0; i < numberOfRows; i++) {
            const row: (string | null)[] = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    // A PRIVATE FUNCTION WHICH IS USED IN THE ESTIMATE WINNER FUNCTION. IT ALLOWS TO CHECK A WINNER BY ROWS.
    private estimateWinnerByRows(squares: (string | null)[][], numberToWin: number): string | null {
        // CHECKING EVERY ELEMENT IN A ROW
        for (let i = 0; i < squares.length; i++) {
            const row = squares[i];
            for (let j = 0; j <= row.length - numberToWin; j++) {
                // CHECKING IF ALL ELEMENTS IN A RANGE [j, j + numberToWin] ARE EQUAL row[j]
                if (row[j] && row.slice(j, j + numberToWin).every(value => value === row[j])) {
                    return row[j];
                }
            }
        }
        return null;
    }

    // A PRIVATE FUNCTION WHICH IS USED IN THE ESTIMATE WINNER FUNCTION. IT ALLOWS TO CHECK A WINNER BY COLUMNS.
    private estimateWinnerByColumns(squares: (string | null)[][], numberToWin: number): string | null {
        const numberOfRows: number = squares.length;
        const numberOfColumns: number = squares[0].length;

        // CHECKING EVERY ELEMENT IN A COLUMN
        for (let i = 0; i < numberOfColumns; i++) {
            const column: (string | null)[] = [];
            for (let j = 0; j < numberOfRows; j++) {
                column.push(squares[j][i]);
            }

            for (let j = 0; j <= numberOfRows - numberToWin; j++) {
                // CHECKING IF ALL ELEMENTS IN A RANGE [j, j + numberToWin) ARE EQUAL column[j]
                if (column[j] && column.slice(j, j + numberToWin).every(value => value === column[j])) {
                    return column[j];
                }
            }
        }
        return null;
    }

    // A PRIVATE FUNCTION WHICH IS USED IN THE ESTIMATE WINNER FUNCTION. IT ALLOWS TO CHECK A WINNER BY
    // DIAGONALS OF THE GIVEN MATRIX.
    private estimateWinnerByDiagonals(squares: (string | null)[][], numberToWin: number): string | null {
        const numberOfRows: number = squares.length;
        const numberOfColumns: number = squares[0].length;

        // A FUNCTION FOR CHECKING THE DIAGONAL TO THE BOTTOM-LEFT OF A GIVEN POINT
        function checkLeftDownDiagonal(row: number, col: number): string | null {
            const diagonal: (string | null)[] = [];
            for (let i = 0; i < numberToWin; i++) {
                if (row + i < numberOfRows && col - i >= 0) {
                    diagonal.push(squares[row + i][col - i]);
                } else {
                    break; // EXIT IF WE GO BEYOND THE BOARD BOUNDARIES
                }
            }

            if (diagonal.length === numberToWin && diagonal.every(value => value === diagonal[0])) {
                return diagonal[0];
            }

            return null;
        }

        // A FUNCTION FOR CHECKING THE DIAGONAL TO THE BOTTOM-RIGHT OF A GIVEN POINT
        function checkRightDownDiagonal(row: number, col: number): string | null {
            const diagonal: (string | null)[] = [];
            for (let i = 0; i < numberToWin; i++) {
                if (row + i < numberOfRows && col + i < numberOfColumns) {
                    diagonal.push(squares[row + i][col + i]);
                } else {
                    break; // EXIT IF WE GO BEYOND THE BOARD BOUNDARIES
                }
            }

            if (diagonal.length === numberToWin && diagonal.every(value => value === diagonal[0])) {
                return diagonal[0];
            }

            return null;
        }

        // SEARCHING A LAST TURN 'X' OR 'O'
        let lastMove: string | null = null;
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                if (squares[row][col] === 'X' || squares[row][col] === 'O') {
                    lastMove = squares[row][col];
                }
            }
        }

        // SEARCHING A WINNER IN ALL POSSIBLE DIAGONALS
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfColumns; col++) {
                if (squares[row][col] === lastMove) {
                    const leftDownWinner = checkLeftDownDiagonal(row, col);
                    if (leftDownWinner) {
                        return leftDownWinner;
                    }

                    const rightDownWinner = checkRightDownDiagonal(row, col);
                    if (rightDownWinner) {
                        return rightDownWinner;
                    }
                }
            }
        }

        return null;
    }
}