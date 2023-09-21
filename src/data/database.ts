import {User} from "../types/User.ts";
import {Game} from "../types/Game.ts";

// A CLASS WHICH IMITATES A WORK OF A DATABASE
export class Database {
    users: User[];
    games: Game[];

    constructor() {
        this.users = [];
        this.games = [];
    }
}

// AN INSTANCE OF CLASS WHICH IMITATES A WORK OF A DATABASE
export const database: Database = new Database();