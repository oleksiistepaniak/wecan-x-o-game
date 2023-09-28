import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";
import {UserRepository} from "../../src/repositories/UserRepository";
import * as assert from "assert";

describe('FindAllUsers', () => {

    before(async () => {
        await t.init();
    });

    after(async () => {
        await t.dispose();
    })

    beforeEach(async() => {
        await t.clearUsers();
    })

    it('Success', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Bob',
            email: "bob@gmail.com",
            password: "bob2BOB"
        });
        await t.post<UserRequestDto>('/user', '', {
            username: 'John',
            email: "john@gmail.com",
            password: "john2JOHN"
        });
        const userRepo = t.app.get(UserRepository);
        const bob = await userRepo.findUserByEmail('bob@gmail.com');
        const john = await userRepo.findUserByEmail('john@gmail.com');
        assert.ok(bob);
        assert.ok(john);

        const result = await t.post('/user/all', '', {

        });
        should(result).deepEqual([
            {
                id: bob.id.toString(),
                email: bob.email,
                username: bob.username,
            },
            {
                id: john.id.toString(),
                email: john.email,
                username: john.username,
            },
        ])
    })

    it('Empty data', async() => {
        const result = await t.post('/user/all', '', {

        });
        should(result).deepEqual([]);
    })
})