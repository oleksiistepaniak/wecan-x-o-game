type User = {
    id: number,
    username: string,
    numberOfVictories: number,
    password: string,
};

const database: User[] = [];

class UserService {

    constructor() {
    }

    createUser(inputUsername: string, password: string): User | string {
        if (this.isUserRegistered(inputUsername)) {
            return 'This user by this username has been registered!' +
                ' Please, try other name for registration!';
        }
        const user: User = {
            id: database.length,
            username: inputUsername,
            numberOfVictories: 0,
            password: password
        };

        database.push(user);

        return user;
    }

    getUserByUsername(username: string): User | undefined {
        return database.find(it=>it.username === username);
    }

    isUserRegistered(inputUsername: string): boolean {
        return this.getUserByUsername(inputUsername)?.username === inputUsername;
    }
}