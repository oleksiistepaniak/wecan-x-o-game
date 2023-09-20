import {User} from "./User.ts";

export class Game {
    id?: number;
    firstUser?: User;
    secondUser?: User;
    board?: (string | null)[][];
    winner?: string | null;

    constructor() {
    }
}