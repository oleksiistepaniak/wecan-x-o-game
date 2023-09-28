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
            const result = await AppDb.appDb.usersCollection.findOne({_id: new ObjectId(id)});
            return result ? new UserModel(result) : null;
    }

    async findUserByEmail(email: string): Promise<UserModel | null> {
        const result = await AppDb.appDb.usersCollection.findOne({email: email});
        return result ? new UserModel(result) : null;
    }

    async updateUser(email: string, user: UserUpdateDto) {
            //todo: fix with transaction or atomic mongo operation
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