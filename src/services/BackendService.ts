import {UserRequestDto} from "../../backend/src/dtos/UserRequestDto.ts";

export class BackendService {
    async createUser(params: UserRequestDto) {
        return await fetch('http://localhost:5555/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
    }
}