import {GameService} from "../services/GameService.ts";
import {RecordsService} from "../services/RecordsService.ts";
import {HistoryService} from "../services/HistoryService.ts";
import {BackendService} from "../services/BackendService.ts";

export class AppContextProvider {
    private static instance: AppContextProvider | null = null;
    readonly gameService: GameService;
    readonly recordsService: RecordsService;
    readonly historyService: HistoryService;
    readonly backendService: BackendService;

    private constructor() {
        this.gameService = new GameService();
        this.recordsService = new RecordsService();
        this.historyService = new HistoryService();
        this.backendService = new BackendService();
    }

    static getInstance(): AppContextProvider {
        if (!AppContextProvider.instance) {
            AppContextProvider.instance = new AppContextProvider();
        }
        return AppContextProvider.instance;
    }
}