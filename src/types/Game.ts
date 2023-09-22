import {User} from "./User.ts";

// A MODEL WHICH DESCRIBES A GAME (USERS, BOARD, WINNER AND SO FORTH)
export class Game {
    id: number;
    //todo: array of users
    //todo: activeUser:null | User;
    firstUser: User; //not needed
    secondUser: User; //not needed
    numberToWin: number;
    board: (string | null)[][];
    winner: string | null;

    constructor(id: number,
                firstUser: User,
                secondUser: User,
                board: (string | null)[][],
                numberToWin: number,
                winner: string | null) {
        this.id = id;
        this.firstUser = firstUser;
        this.secondUser = secondUser;
        this.numberToWin = numberToWin;
        this.board = board;
        this.winner = winner;
    }

    //todo: Add user
    //todo: getWinner
    //todo: getActiveUser
    //todo: isStarted (all users are in game)
}