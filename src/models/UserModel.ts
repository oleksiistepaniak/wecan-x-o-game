import {ObjectId} from "mongodb";
import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {UserResponseDto} from "../dtos/UserResponseDto";
import {UserRecord} from "../db/interfaces";

export class UserModel {
    private readonly _data: UserRecord;

    constructor(data: UserRecord) {
        this._data = {
            ...data,
        };
    }

    get data(): Readonly<UserRecord> { return this._data };

    get id() { return this._data._id };
    get email() { return this._data.email };
    get username() { return this._data.username };
    get password() { return this._data.password };
    get numberOfVictories() { return this._data.numberOfVictories };

    mapToDto(): UserResponseDto {

        const data = this._data;
        return {
            id: data._id.toString(),
            email: data.email,
            username: data.username,
        }
    }
}