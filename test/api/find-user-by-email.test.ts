import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";
import {UserRepository} from "../../src/repositories/UserRepository";
import {UserService} from "../../src/services/UserService";

describe('FindUserByEmail', () => {
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
        const oleksii: UserRequestDto = await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result = await t.get(`/user?email=${oleksii.email}`, '');

        should(result).deepEqual([oleksii]);
    })

    it('User not found', async () => {
        const email: string = 'isnotvalidemail@gmail.com';
        const result = await t.get(`/user?email=${email}`, '');
        should(result).deepEqual([])
    })
})