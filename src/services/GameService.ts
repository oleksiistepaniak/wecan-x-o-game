// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE BOARD COMPONENT
import {Game} from "../types/Game.ts";
import {database} from "../data/database.ts";
import {User} from "../types/User.ts";

export class GameService {
    constructor() {
    }

    getGameById(id: number): Game | undefined {
        return database.games.find(it => it.id === id);
    }

    createGame(
        firstUser: User,
        secondUser: User,
        board: (string | null)[][],
        winner: string): Game {

        const game: Game = {
            id: database.games.length + 1,
            firstUser: firstUser,
            secondUser: secondUser,
            board: board,
            winner: winner,
        };

        database.games.push(game);

        return game;
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
    estimateWinner(squares: (string | null) [][], firstUser: User, secondUser: User): string | null {
        let winner: string | null = null;

        if (this.estimateWinnerByRows(squares)) {
            winner = this.estimateWinnerByRows(squares);
        }
        if (this.estimateWinnerByColumns(squares)) {
            winner = this.estimateWinnerByColumns(squares);
        }
        if (this.estimateWinnerByDiagonals(squares)) {
            winner = this.estimateWinnerByDiagonals(squares);
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
    private estimateWinnerByRows(squares: (string | null) [][]): string | null {
        // CHECKING EVERY ELEMENT IN A ROW
        for (let i = 0; i < squares.length; i++) {
            const row = squares[i];
            if (row[0] && row.every((value) => value === row[0])) {
                return row[0];
            }
        }
        return null;
    }

    // A PRIVATE FUNCTION WHICH IS USED IN THE ESTIMATE WINNER FUNCTION. IT ALLOWS TO CHECK A WINNER BY COLUMNS.
    private estimateWinnerByColumns(squares: (string | null) [][]): string | null {
        const numberOfRows: number = squares.length;
        const numberOfColumns: number = squares[0].length;

        // CHECKING EVERY ELEMENT IN A COLUMN
        for (let i = 0; i < numberOfColumns; i++) {
            const column: (string | null) [] = [];
            for (let j = 0; j < numberOfRows; j++) {
                column.push(squares[j][i]);
            }
            if (column[0] && column.every((value) => value === column[0])) {
                return column[0];
            }
        }
        return null;
    }

    // A PRIVATE FUNCTION WHICH IS USED IN THE ESTIMATE WINNER FUNCTION. IT ALLOWS TO CHECK A WINNER BY
    // DIAGONALS OF THE GIVEN MATRIX.
    private estimateWinnerByDiagonals(squares: (string | null) [][]): string | null {
        const numberOfRows: number = squares.length;
        const numberOfColumns: number = squares[0].length;

        // CHECKING EVERY ELEMENT IN THE MAIN DIAGONAL
        const mainDiagonal: (string | null)[] = [];
        for (let i = 0; i < numberOfRows && i < numberOfColumns; i++) {
            mainDiagonal.push(squares[i][i]);
        }

        if (mainDiagonal[0] && mainDiagonal.every((value) => value === mainDiagonal[0])) {
            return mainDiagonal[0];
        }

        // CHECKING EVERY ELEMENT IN THE OPPOSITE DIAGONAL
        const oppositeDiagonal: (string | null)[] = [];
        for (let i = 0; i < numberOfRows && i < numberOfColumns; i++) {
            oppositeDiagonal.push(squares[i][numberOfColumns - 1 - i]);
        }

        if (oppositeDiagonal[0] && oppositeDiagonal.every((value) => value === oppositeDiagonal[0])) {
            return oppositeDiagonal[0];
        }
        return null;
    }
}