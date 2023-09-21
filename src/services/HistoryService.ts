import {database} from "../data/database.ts";
import {Game} from "../types/Game.ts";

export class HistoryService {

    constructor() {
    }

    getGameById(id: number): Game | undefined {
        return database.games.find((it) => it.id === id);
    }
}