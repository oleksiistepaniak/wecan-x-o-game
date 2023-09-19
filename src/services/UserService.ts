import {User} from "../types/User.tsx";

export const usersDatabase: User[]= [];

// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE REGISTRATION PAGE
export class UserService {

    constructor() {
    }

    // A FUNCTION WHICH ALLOWS TO REGISTER A NEW USER
    createUser(inputUsername: string, password: string): User | string {
         if (this.isUserRegistered(inputUsername)) {
            return 'A user with this username already exists!';
          }
         if (inputUsername.length < 3) {
             return 'You have entered invalid username! Username must include at least 3 characters!';
         }
         if (password.length < 6) {
             return 'You have entered invalid password! Password must include at least 6 characters!';
         }
        const user: User = {
            id: usersDatabase.length,
            username: inputUsername,
            numberOfVictories: 0,
            password: password
        };

        usersDatabase.push(user);
        return user;
    }

    // A FUNCTION WHICH ALLOWS TO SIGN IN
    authenticate(username: string, password: string): string {
        const user: User | undefined = this.getUserByUsername(username);
        if (typeof user === 'undefined') {
            return 'The user with this username does not exist!';
        }
        if (user.username === username && user.password === password) {
            return 'You have successfully signed in. Please, wait a little bit!';
        }
        return 'You have entered wrong password or username. Please, try again!';
    }

    // A FUNCTION WHICH ALLOWS TO GET A USER BY USERNAME
    private getUserByUsername(username: string): User | undefined {
        return usersDatabase.find(it=>it.username === username);
    }

    // A FUNCTION WHICH ALLOWS TO CHECK IF A USER IS SIGNED UP
    private isUserRegistered(inputUsername: string): boolean {
        return this.getUserByUsername(inputUsername)?.username === inputUsername;
    }
}