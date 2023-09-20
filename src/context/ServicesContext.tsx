import {createContext, useContext, ReactNode} from "react";
import {GameService} from "../services/GameService.ts";
import {RecordsService} from "../services/RecordsService.ts";
import {UserService} from "../services/UserService.ts";
import {ServicesContext} from "../types/ServicesContext.ts";
import {BoardMakerService} from "../services/BoardMakerService.ts";

const ServicesContext =
    createContext<ServicesContext | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode}) {
    const gameService: GameService = new GameService();
    const userService: UserService = new UserService();
    const recordsService: RecordsService = new RecordsService();
    const boardMakerService: BoardMakerService = new BoardMakerService();

    return (
        <ServicesContext.Provider value={{ gameService, userService, recordsService, boardMakerService}}>
            {children}
        </ServicesContext.Provider>
    )
}

export function useServices(): ServicesContext {
    const context: ServicesContext | undefined = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServices повинен використовуватися в межах ServicesProvider');
    }
    return context;
}