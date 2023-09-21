// A MODEL WHICH DESCRIBES A USER (USERNAME, QUANTITY OF VICTORIES, PASSWORD AND SO FORTH)
export class User {
    id: number;
    username: string;
    numberOfVictories: number;
    password: string;
    isNextTurn: boolean;

    constructor(id: number,
                username: string,
                numberOfVictories: number,
                password: string,
                isNextTurn: boolean) {
        this.id = id;
        this.username = username;
        this.numberOfVictories = numberOfVictories;
        this.password = password;
        this.isNextTurn = isNextTurn;
    }
}