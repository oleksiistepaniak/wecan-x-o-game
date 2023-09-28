import {HttpException, Injectable} from '@nestjs/common';
import {UserModel} from "../models/UserModel";
import {UserRepository} from "../repositories/UserRepository";
import {ObjectId} from "mongodb";
import {UserUpdateDto} from "../dtos/UserUpdateDto";
import {UserRequestDto} from "../dtos/UserRequestDto";
import {UserResponseDto} from "../dtos/UserResponseDto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async create(userParams: UserRequestDto): Promise<UserModel> {
        const user: UserModel = new UserModel({
            _id: new ObjectId(),
            username: userParams.username,
            email: userParams.email,
            password: userParams.password,
            numberOfVictories: 0,
        });
        try {
            await this.userRepository.createUser(user);
        } catch (error) {
            const errorMessage = String(error);
            const isNameDuplicate = errorMessage.includes('E11000') && errorMessage.includes('username:');
            const isEmailDuplicate = errorMessage.includes('E11000') && errorMessage.includes('email:');
            if (isNameDuplicate) {
                throw new HttpException('Duplicate name error', 400);
            }
            if (isEmailDuplicate) {
                throw new HttpException('Duplicate email error', 400);
            }
            throw error;
        }
        return user;
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAllUsers();
        return users.map(value => value.mapToDto());
    }

    async findOneById(id: string) {
        const user = await this.userRepository.findUserById(id);
        return user!.mapToDto();
    }

    async findOneByEmail(email: string): Promise<UserResponseDto> {
            const user = await this.userRepository.findUserByEmail(email);
            if (user === null) {
                throw new HttpException(`There is no such users by email ${email} in the database!`, 400);
            }
            return user.mapToDto();
    }

    update(email: string, user: UserUpdateDto) {
        return this.userRepository.updateUser(email, user);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
