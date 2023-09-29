import {UserModel} from "../models/UserModel";
import {AppDb} from "../db/AppDb";
import {Injectable} from "@nestjs/common";
import {ClientSession, ObjectId} from "mongodb";
import {UserUpdateDto} from "../dtos/UserUpdateDto";

@Injectable()
export class UserRepository {

    async createUser(session: ClientSession, user: UserModel): Promise<void> {
        await AppDb.appDb.usersCollection.insertOne(user.data, { session });
    }

    async findAllUsers(session: ClientSession): Promise<UserModel[]> {
            const result = await AppDb.appDb.usersCollection
                .find({}, {session}).toArray();
            const array = result.map(record => new UserModel(record));
            return array;
    }

    async findUserById(session: ClientSession, id: string): Promise<UserModel | null> {
            const result = await AppDb.appDb.usersCollection
                .findOne({_id: new ObjectId(id)}, {session});
            return result ? new UserModel(result) : null;
    }

    async findUserByEmail(session: ClientSession, email: string): Promise<UserModel | null> {
        const result = await AppDb.appDb.usersCollection
            .findOne({email}, {session});
        return result ? new UserModel(result) : null;
    }

    async updateUser(session: ClientSession, email: string, user: UserUpdateDto): Promise<UserModel | null> {
        const updateFields: object = {}
        for (const key in user) {
            if (user[key] !== undefined) {
                updateFields[key] = user[key];
            }
        }
            const filter = { email: email };
            const update = { $set: updateFields };

            const result = await AppDb.appDb.usersCollection
                .updateOne(filter, update, {session});

            if (result.modifiedCount === 1) {
                const updatedUser = await AppDb.appDb.usersCollection
                    .findOne({ email: user.email}, {session});
                return updatedUser ? new UserModel(updatedUser) : null;
            } else {
                throw new Error('A user is not successfully updated!');
            }
    }

    async removeUser(session: ClientSession, email: string): Promise<UserModel | null> {
        const userRecord = await AppDb.appDb.usersCollection.findOne({email},
            {session});
        const userForDeletion = new UserModel(userRecord!);
       const resul = await AppDb.appDb.usersCollection.deleteOne({email: email}, {session});
       if (resul.deletedCount === 1) {
           return userForDeletion;
       }
       return null;
    }
}