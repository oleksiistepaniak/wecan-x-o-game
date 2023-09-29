import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";
import {UserRepository} from "../../src/repositories/UserRepository";
import * as assert from "assert";
import {AppDb} from "../../src/db/AppDb";

// TESTS WHICH ALLOW TO CHECK AN ENDPOINT CREATING A USER
describe('CreateUser', () => {
    before(async () => {
        await t.init();
    });

    after(async () => {
        await t.dispose();
    });

    beforeEach(async() => {
        await t.clearUsers();
    });

    // A TEST WHICH CHECKS A SUCCESS CASE
    it('Success', async () => {
        const result = await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const userRepo = t.app.get(UserRepository);
        const user = await AppDb.appDb.client.withSession(session => {
            return session.withTransaction(session => {
                return userRepo.findUserByEmail(session, 'oleksii@gmail.com');
            })
        });
        assert.ok(user);

        should(result).deepEqual({
            id: user.id.toString(),
            username: 'Oleksii',
            email: "oleksii@gmail.com",
        })
    });

    // A TEST WHICH CHECKS A FAILED CASE BECAUSE OF DUPLICATED NAME
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

    // A TEST WHICH CHECKS A FAILED CASE BECAUSE OF DUPLICATED EMAIL
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
