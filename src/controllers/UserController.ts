import {Controller, Post, Body, UsePipes, ValidationPipe, Query, Param} from '@nestjs/common';
import { UserService } from '../services/UserService';
import {UserRequestDto} from "../dtos/UserRequestDto";
import {UserUpdateDto} from "../dtos/UserUpdateDto";
import {UserResponseDto} from "../dtos/UserResponseDto";
import {EmailRequestDto} from "../dtos/EmailRequestDto";
import {IdRequestDto} from "../dtos/IdRequestDto";
import {AppDb} from "../db/AppDb";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
        const user: UserResponseDto =  await AppDb.appDb.client.withSession (session => {
            return session.withTransaction(session => {
                return this.userService.create(session, dto)
            })
        })
        return user;
    }

    @Post('by-email')
    @UsePipes(new ValidationPipe())
    async findOneByEmail(@Body() dto: EmailRequestDto): Promise<UserResponseDto> {
        const user: UserResponseDto = await AppDb.appDb.client.withSession(session => {
            return session.withTransaction(session => {
                return this.userService.findOneByEmail(session, dto.email);
            })
        })
        return user;
    }

    @Post('by-id')
    @UsePipes(new ValidationPipe())
    async findOneById(@Body() dto: IdRequestDto): Promise<UserResponseDto> {
        const user: UserResponseDto = await AppDb.appDb.client.withSession(session => {
            return session.withTransaction(session => {
                return this.userService.findOneById(session, dto.id);
            })
        })
        return user;
    }

    @Post('all')
    async findAll(): Promise<UserResponseDto[]> {
        const users: UserResponseDto[] = await AppDb.appDb.client.withSession(session => {
            return session.withTransaction(session => {
                return this.userService.findAll(session);
            })
        })
        return users;
    }

    @Post('update/:email')
    @UsePipes(new ValidationPipe())
    async update(@Param('email') email: string, @Body() dto: UserUpdateDto): Promise<UserResponseDto> {
        const user: UserResponseDto = await AppDb.appDb.client.withSession(session => {
            return session.withTransaction(session => {
                return this.userService.update(session, email, dto);
            })
        })
        return user;
    }

    @Post('delete')
    async remove(@Query('email') email: string): Promise<UserResponseDto> {
        return await AppDb.appDb.client.withSession(session => {
            return session.withTransaction(session => {
                return this.userService.remove(session, email);
            })
        })
    }
}
