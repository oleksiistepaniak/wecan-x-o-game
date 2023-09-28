import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";

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

        const result = await t.post(`/user/by-email`, '', {
            email: 'oleksii@gmail.com',
        });

        should(result).deepEqual(oleksii);
    })

    it('User not found', async () => {
        const email: string = 'isnotvalidemail@gmail.com';
        const result = await t.post(`/user/by-email`, '', {
            email: email,
        });
        should(result).deepEqual({
            statusCode: 400,
            message: `There is no such users by email ${email} in the database!`
        })
    })
})