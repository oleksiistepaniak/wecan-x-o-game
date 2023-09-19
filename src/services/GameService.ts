// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE BOARD COMPONENT
export class GameService {
    constructor() {
    }

    // A FUNCTION WHICH ALLOWS TO DISPLAY A STATUS GAME INFO
    printStatusInfo(squares: (string | null)[][], xIsNextTurn: boolean, winner: string | null): string {
        let status: string;

        if (winner) {
            status = `Congratulations! A winner is ${winner}`;
        } else {
            status = `The next player's move: ${xIsNextTurn ? 'X' : 'O'}`;
        }

        if (squares.every((array) =>
            array.every((value) => (value !== null) && !winner))) {
            status = `Draw!`;
        }

        return status;
    }

    // A FUNCTION WHICH ALLOWS TO CALCULATE A WINNER OF THE GAME
    estimateWinner(squares: (string | null) [][]): string | null {
        if (this.estimateWinnerByRows(squares)) {
            return this.estimateWinnerByRows(squares);
        }
        if (this.estimateWinnerByColumns(squares)) {
            return this.estimateWinnerByColumns(squares);
        }
        return this.estimateWinnerByDiagonals(squares);
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