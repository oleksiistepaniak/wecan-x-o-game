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

    @Post('by-email')
    findOneByEmail(@Body() email: string): Promise<UserResponseDto> {
        return this.userService.findOneByEmail(email);
    }

    @Post('by-id')
    findOneById(@Body() id: string): Promise<UserResponseDto> {
        return this.userService.findOneById(id);
    }

    @Post('all')
    findAll(): Promise<UserResponseDto[]> {
        return this.userService.findAll();
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
