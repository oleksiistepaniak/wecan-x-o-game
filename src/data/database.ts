import {User} from "../types/User.ts";
import {Game} from "../types/Game.ts";

// A CLASS WHICH IMITATES A WORK OF A DATABASE
export class Database {
    users: User[]; //todo: private
    games: Game[]; //todo: private

    constructor() {
        this.users = [];
        this.games = [];
    }

    //todo: create function to  create game
    //todo: create function to get game by id
    //todo: create function to get all game by userID
    //todo: create function to  create user
    //todo: create function to get user

}

// AN INSTANCE OF CLASS WHICH IMITATES A WORK OF A DATABASE
export const database: Database = new Database();