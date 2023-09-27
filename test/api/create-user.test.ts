import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";
import {UserRepository} from "../../src/repositories/UserRepository";
import * as assert from "assert";


describe('CreateUser', () => {
    //

    before(async () => {
        await t.init();
    });

    after(async () => {
        await t.dispose();
    });

    beforeEach(async() => {
        await t.clearUsers();
    });

    it('Success', async () => {
        const result = await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const userRepo = t.app.get(UserRepository);
        const user = await userRepo.findUserByEmail('oleksii@gmail.com');
        assert.ok(user);
        should(user.data).deepEqual({
            _id: user.id,
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs",
            numberOfVictories: 0,
        })

        should(result).deepEqual({
            id: user.id.toString(),
            username: 'Oleksii',
            email: "oleksii@gmail.com",
        })
    });

    it('Duplicate name error', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksissdi@gmail.com",
            password: "bob2LLs"
        });

        const result = await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        should(result).deepEqual({
            statusCode: 400,
            message: 'Duplicate name error',
        })
    })

    it('Duplicate email error', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Bob',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result = await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        should(result).deepEqual({
            statusCode: 400,
            message: 'Duplicate email error',
        })
    })


});
