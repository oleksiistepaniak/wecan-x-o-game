import {User} from "../types/User.ts";

// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE RECORDS COMPONENT
export class RecordsService {

    constructor() {
    }

    // A FUNCTION WHICH ALLOWS TO SORT USERS BY BIGGEST QUANTITY OF VICTORIES
    sortUsersWithBiggestNumberOfVictories(database: User[]): User[] {
        if (database.length < 5) {
            return database;
        }

        return database.sort((firstUser: User, secondUser: User) => {
            if (firstUser.numberOfVictories !== secondUser.numberOfVictories) {
                return secondUser.numberOfVictories - firstUser.numberOfVictories;
            }
            return firstUser.username.localeCompare(secondUser.username);
        }).slice(0, 6);
    }
}