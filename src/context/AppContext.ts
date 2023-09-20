import {GameService} from "../services/GameService.ts";
import {UserService} from "../services/UserService.ts";
import {RecordsService} from "../services/RecordsService.ts";
import {BoardMakerService} from "../services/BoardMakerService.ts";

export class AppContextProvider {
    readonly gameService: GameService;
    readonly userService: UserService;
    readonly recordsService: RecordsService;
    readonly boardMakerService: BoardMakerService;

    constructor() {
        this.gameService = new GameService();
        this.userService = new UserService();
        this.recordsService = new RecordsService();
        this.boardMakerService = new BoardMakerService();
    }
}