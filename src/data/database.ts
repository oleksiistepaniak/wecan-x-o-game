import {User} from "../types/User.ts";
import {Game} from "../types/Game.ts";

export class Database {
    users: User[];
    games: Game[];

    constructor() {
        this.users = [];
        this.games = [];
    }
}

export const database: Database = new Database();