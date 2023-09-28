import {UserRequestDto} from "../../backend/src/dtos/UserRequestDto.ts";

// A SERVICE WHICH IS RESPONSIBLE FOR THE WHOLE LOGIC FOR THE REGISTRATION PAGE
export class UserService {

    constructor() {
    }

    // A FUNCTION WHICH ALLOWS TO REGISTER A NEW USER
    async createUser(params: UserRequestDto) {
        return await fetch('http://localhost:5555/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
    }

    async getUserById(id: string){
        try {
            const response = await fetch(`http://localhost:5555/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Your query does not work correctly!');
            }

            const user = await response.json();
            return {
                _id: user._id,
                username: user.username,
                password: user.password,
                numberOfVictories: user.numberOfVictories,
            };
        } catch (error) {
            console.error(`Error retrieving user by id: ${id}`, error);
            throw error;
        }
    }
}