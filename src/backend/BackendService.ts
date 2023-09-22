import {BackendController} from "./BackendController.ts";

export interface CreateGameParams {
    boardWidth: number,
    boardHeight: number,
    numberToWin: number,
}

export interface IUser {
    id: string,
    name: string,
}

export interface CreateGameResponse {
    id: string,
    users: IUser[],
    board: (string | null)[][],

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class BackendService {
    backendController = new BackendController();
    constructor() {
    }
    async createGame(params: CreateGameParams): Promise<GameModel> {
        await sleep(500);


        const response = await this.backendController.createGame(params);



        return new GameModel(response)

    }

    async call<T>(path: string, params: {}): Promise<{result?: T, error?: string}>
    {
        const url = `baseUrl/${path}`;

        let resp: Response;

        try {
            resp = await fetch(url, {
                method: "POST",
                headers: {
                    /* mime type json */
                    authentication: "Bearer ACCESS_TOKEN"
                },
                body: JSON.stringify(params),
            });
        } catch (err) {
            return {error: (err as any).message}
        }

        if (!resp.ok) {
            return {error: "..."}
        }

        try {
            const body = await resp.json();
            return {result: body};
        } catch (err) {
            return {error: (err as any).message}
        }


    }
}