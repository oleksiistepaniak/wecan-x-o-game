import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";
import {UserResponseDto} from "../../src/dtos/UserResponseDto";
describe('RemoveUser', () => {
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
        await t.post<UserRequestDto>('/user', '', {
            email: "oleksii@gmail.com",
            username: 'Oleksii',
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/delete?email=oleksii@gmail.com`,
            '', {});

        should(result).deepEqual({
            id: result.id,
            email: 'oleksii@gmail.com',
            username: 'Oleksii',
        });
    });

    it('DeletionNotExistingUser', async () => {
        const email: string = 'oleksii@gmail.com';
        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/delete?email=${email}`,
            '', {});

        should(result).deepEqual({
            message: `There is no such users by email ${email} for removing in the database!`,
            statusCode: 400,
        });
    })
});