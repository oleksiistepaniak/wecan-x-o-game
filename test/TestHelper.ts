import {INestApplication} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "../src/app.module";
import {AppDb} from "../src/db/AppDb";
import fetch from "node-fetch";

class TestHelper {
    app!: INestApplication;
    baseUrl = 'http://127.0.0.1:3000';

    async init() {
        this.app = await NestFactory.create(AppModule);
        await AppDb.appDb.initialize();
        await this.app.listen(3000);
    }

    async dispose() {
        await this.app.close();
    }

    async clearUsers() {
        await AppDb.appDb.usersCollection.deleteMany();
    }

    async post<T>(path: string, authToken: string, params: object): Promise<T> {
        const url = this.baseUrl + path;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json();
        return result;
    }

    async get<T>(path: string, authToken: string): Promise<T> {
        const url = this.baseUrl + path;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json();
        return result;
    }

}

export const t = new TestHelper();