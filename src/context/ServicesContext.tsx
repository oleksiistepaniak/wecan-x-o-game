import {createContext, useContext, ReactNode} from "react";
import {GameService} from "../services/GameService.ts";
import {RecordsService} from "../services/RecordsService.ts";
import {UserService} from "../services/UserService.ts";

type ServicesContextType = {
    gameService: GameService,
    userService: UserService,
    recordsService: RecordsService,
};

const ServicesContext =
    createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode}) {
    const gameService: GameService = new GameService();
    const userService: UserService = new UserService();
    const recordsService: RecordsService = new RecordsService();

    return (
        <ServicesContext.Provider value={{ gameService, userService, recordsService}}>
            {children}
        </ServicesContext.Provider>
    )
}

export function useServices(): ServicesContextType {
    const context: ServicesContextType | undefined = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServices повинен використовуватися в межах ServicesProvider');
    }
    return context;
}