import {User} from "./User.ts";

// A MODEL WHICH DESCRIBES A GAME (USERS, BOARD, WINNER AND SO FORTH)
export class Game {
    id: number;
    firstUser: User;
    secondUser: User;
    board: (string | null)[][];
    winner: string | null;

    constructor(id: number,
                firstUser: User,
                secondUser: User,
                board: (string | null)[][],
                winner: string | null) {
        this.id = id;
        this.firstUser = firstUser;
        this.secondUser = secondUser;
        this.board = board;
        this.winner = winner;
    }
}