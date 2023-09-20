import {User} from "../types/User.ts";

// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE RECORDS COMPONENT
export class RecordsService {

    constructor() {
    }

    // A FUNCTION WHICH ALLOWS TO SORT USERS BY BIGGEST QUANTITY OF VICTORIES
    sortUsersWithBiggestNumberOfVictories(database: User[]): User[] {
        return database.sort((firstUser: User, secondUser: User) => {
            return secondUser.numberOfVictories - firstUser.numberOfVictories;
        }).slice(0, 6);
    }
}