import {GameService} from "../services/GameService.ts";
import {UserService} from "../services/UserService.ts";
import {RecordsService} from "../services/RecordsService.ts";
import {BoardMakerService} from "../services/BoardMakerService.ts";
import {HistoryService} from "../services/HistoryService.ts";

export class AppContextProvider {
    private static instance: AppContextProvider | null = null;
    readonly gameService: GameService;
    readonly userService: UserService;
    readonly recordsService: RecordsService;
    readonly boardMakerService: BoardMakerService;
    readonly historyService: HistoryService;

    private constructor() {
        this.gameService = new GameService();
        this.userService = new UserService();
        this.recordsService = new RecordsService();
        this.boardMakerService = new BoardMakerService();
        this.historyService = new HistoryService();
    }

    static getInstance(): AppContextProvider {
        if (!AppContextProvider.instance) {
            AppContextProvider.instance = new AppContextProvider();
        }
        return AppContextProvider.instance;
    }
}