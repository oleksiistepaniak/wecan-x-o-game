
export class RecordsService {
    constructor() {
    }

    sortUsersWithBiggestNumberOfVictories(database: User[]): User[] {
        return database.sort((firstUser: User, secondUser: User) => {
            return secondUser.numberOfVictories - firstUser.numberOfVictories;
        }).slice(0, 6);
    }
}