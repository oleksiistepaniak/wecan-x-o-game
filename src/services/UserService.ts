import {HttpException, Injectable} from '@nestjs/common';
import {UserModel} from "../models/UserModel";
import {UserRepository} from "../repositories/UserRepository";
import {ClientSession, ObjectId} from "mongodb";
import {UserUpdateDto} from "../dtos/UserUpdateDto";
import {UserRequestDto} from "../dtos/UserRequestDto";
import {UserResponseDto} from "../dtos/UserResponseDto";
import {EncryptUtil} from "../util/EncryptUtil";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async create(session: ClientSession, userParams: UserRequestDto): Promise<UserResponseDto> {
        const hashedPassword: string = await EncryptUtil.hashPassword(userParams.password);
        const user: UserModel = new UserModel({
            _id: new ObjectId(),
            username: userParams.username,
            email: userParams.email,
            password: hashedPassword,
            numberOfVictories: 0,
        });
        try {
            await this.userRepository.createUser(session, user);
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
        return user.mapToDto();
    }

    async findAll(session: ClientSession): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAllUsers(session);
        return users.map(value => value.mapToDto());
    }

    async findOneById(session: ClientSession, id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findUserById(session, id);
        return user!.mapToDto();
    }

    async findOneByEmail(session: ClientSession, email: string): Promise<UserResponseDto> {
            const user = await this.userRepository.findUserByEmail(session, email);
            if (user === null) {
                throw new HttpException(`There is no such users by email ${email} in the database!`, 400);
            }
            return user.mapToDto();
    }

    async update(session: ClientSession, email: string, userParams: UserUpdateDto): Promise<UserResponseDto> {
        const user = await this.userRepository.updateUser(session, email, userParams);
        if (user === null) {
            throw new HttpException(`There is no such users by email ${email} for updating in the database!`, 400);
        }
        return user.mapToDto();
    }

    async remove(session: ClientSession, email: string): Promise<UserResponseDto> {
        const user = await this.userRepository.removeUser(session, email);
        if (user === null) {
            throw new HttpException(`There is no such users by email ${email} for removing in the database!`, 400);
        }
        return user.mapToDto();
    }
}
