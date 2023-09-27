import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query} from '@nestjs/common';
import { UserService } from '../services/UserService';
import {UserRequestDto} from "../dtos/UserRequestDto";
import {UserUpdateDto} from "../dtos/UserUpdateDto";
import {UserResponseDto} from "../dtos/UserResponseDto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
        const user = await this.userService.create(dto);
        return user.mapToDto();
    }

    @Get()
    findAll(): Promise<UserResponseDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.userService.findOneById(id);
    }

    @Get()
    findOneByEmail(@Query('email') email: string): Promise<UserResponseDto> {
        return this.userService.findOneByEmail(email);
    }

    @Patch()
    update(@Query('email') email: string, @Body() dto: UserUpdateDto) {
        return this.userService.update(email, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
