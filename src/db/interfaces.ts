import {ObjectId} from "mongodb";

export interface UserRecord {
    _id: ObjectId;
    email: string;
    username: string;
    password: string;
    numberOfVictories: number;
}