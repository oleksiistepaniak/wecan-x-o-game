import {GameService} from "../services/GameService.ts";
import {UserService} from "../services/UserService.ts";
import {RecordsService} from "../services/RecordsService.ts";
import {BoardMakerService} from "../services/BoardMakerService.ts";

export type ServicesContext = {
    gameService: GameService,
    userService: UserService,
    recordsService: RecordsService,
    boardMakerService: BoardMakerService,
};