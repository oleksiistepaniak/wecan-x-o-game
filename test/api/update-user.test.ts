import {t} from "../TestHelper";
import {UserRequestDto} from "../../src/dtos/UserRequestDto";
import should from "should";
import {UserResponseDto} from "../../src/dtos/UserResponseDto";

describe('UpdateUser', () => {
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
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: 'Ivanko',
            password: "ivanKO228"
        });

        should(result).deepEqual({
            id: result.id,
            email: 'ivanko@gmail.com',
            username: 'Ivanko'
        });
    });

    it('Invalid password (only digits)', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: 'Ivanko',
            password: "111111"
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['The password must contain uppercase letters, lowercase letters, and digits!'],
            statusCode: 400,
        });
    });

    it('Invalid password (only digits and lowercase letters)', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: 'Ivanko',
            password: "111aaa"
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['The password must contain uppercase letters, lowercase letters, and digits!'],
            statusCode: 400,
        });
    });

    it('Empty password', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: 'Ivanko',
            password: ""
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['The password must contain uppercase letters, lowercase letters, and digits!',
                'Password must be greater than 6 characters!',
                'Password should not be empty!'],
            statusCode: 400,
        });
    });

    it('Too short password', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: 'Ivanko',
            password: "paSS1"
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['Password must be greater than 6 characters!'],
            statusCode: 400,
        });
    });

    it('Invalid email', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'invalidemail',
            username: 'Ivanko',
            password: "passWORD28"
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['You have entered an invalid email!'],
            statusCode: 400,
        });
    });

    it('Empty username', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: '',
            password: "ivanKO90"
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['Username must include only latin letters!',
                'Username must be greater than 3 characters!',
                'Username should not be empty!'],
            statusCode: 400,
        });
    });

    it('Too short username', async () => {
        await t.post<UserRequestDto>('/user', '', {
            username: 'Oleksii',
            email: "oleksii@gmail.com",
            password: "bob2LLs"
        });

        const result: UserResponseDto = await t.post<UserResponseDto>(`/user/update/oleksii@gmail.com`, '', {
            email: 'ivanko@gmail.com',
            username: 'aa',
            password: "ivanKO90"
        });

        should(result).deepEqual({
            error: 'Bad Request',
            message: ['Username must be greater than 3 characters!'],
            statusCode: 400,
        });
    });


});