type User = {
    id: number,
    username: string,
    numberOfVictories: number,
    password: string,
};

const database: User[] = [];

// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE REGISTRATION PAGE
class UserService {

    constructor() {
    }

    createUser(inputUsername: string, password: string): User | string {
        if (this.isUserRegistered(inputUsername)) {
            return 'This user has been already registered.'
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