import {UserModel} from "../models/UserModel";
import {AppDb} from "../db/AppDb";
import {Injectable} from "@nestjs/common";
import {ObjectId} from "mongodb";
import {UserUpdateDto} from "../dtos/UserUpdateDto";



@Injectable()
export class UserRepository {
    constructor() {
    }

    async createUser(user: UserModel) {
        await AppDb.appDb.usersCollection.insertOne(user.data);
    }

    async findAllUsers(): Promise<UserModel[]> {
            const result = await AppDb.appDb.usersCollection.find().toArray();
            const array = result.map(value => new UserModel(value))
            return array;
    }

    async findUserById(id: string) {
        try {
            const userId: ObjectId = new ObjectId(id);
            const result = await AppDb.appDb.usersCollection.findOne({_id: userId});
            console.log(`A successful attempt to retrieve a user by id ${id}!`, result);
            return result;
        } catch (error) {
            console.error('A failed attempt during retrieving a user by id from the database!');
            throw new Error(`You could not retrieve a user by id ${id} from the database!`);
        }
    }

    async findUserByEmail(email: string): Promise<UserModel | null> {
        const result = await AppDb.appDb.usersCollection.findOne({email: email});
        return result ? new UserModel(result) : null;
    }

    async updateUser(email: string, user: UserUpdateDto) {
            const userForUpdate = await AppDb.appDb.usersCollection.findOne({email: email});
            if (!userForUpdate) {
                throw new Error('User not found');
            }
            const updateFields = {
                username: user.username !== undefined ? user.username : userForUpdate.username,
                password: user.password !== undefined ? user.password : userForUpdate.password,
                email: user.email !== undefined ? user.email : userForUpdate.email,
            };
            const filter = { email: email };
            const update = { $set: updateFields}

            const result = await AppDb.appDb.usersCollection.updateOne(filter, update);
            if (result.modifiedCount === 1) {
                console.log(`A successful attempt to update a user by email ${email}`);
            }
    }
}