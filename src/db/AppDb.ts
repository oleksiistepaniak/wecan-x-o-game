import {Collection, Db, MongoClient} from "mongodb";
import {UserRecord} from "./interfaces";

const url: string = 'mongodb://localhost:27017/wecan-x-o-game';

export class AppDb {
    public static appDb: AppDb = new AppDb();
    public client: MongoClient;
    public db: Db;
    public usersCollection: Collection<UserRecord>;
    public gamesCollection: Collection;

    constructor() {
        this.client = new MongoClient(url);
        this.db = this.client.db();
        this.usersCollection = this.db.collection('users');
        this.gamesCollection = this.db.collection('games');
    }

    async initialize() {
        try {
            await this.client.connect();

            await this.usersCollection.createIndex({email: 1}, {unique: true});
            await this.usersCollection.createIndex({username: 1}, {unique: true});
        } catch (error) {
            console.error('An error during executing the database', error);
            throw error;
        }
    }
}