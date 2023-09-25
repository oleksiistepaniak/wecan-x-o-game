import {IUserRepository} from "../repositories/IUserRepository.ts";
import {IUser} from "../models/IUser.ts";

export class IUserService {
    private userRepository: IUserRepository = new IUserRepository();

    constructor() {
    }

    async createUser(user: IUser) {
        return await this.userRepository.createUser(user);
    }

    async getUserById(id: string) {
        const mongoUser = await this.userRepository.getUserById(id);
        const user: IUser = JSON.parse(JSON.stringify(mongoUser));
        return user;
    }
}