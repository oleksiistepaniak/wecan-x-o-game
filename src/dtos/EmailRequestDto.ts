import {IsEmail} from "class-validator";

export class EmailRequestDto {
    @IsEmail({}, {message: 'You have entered an invalid email!'})
    email!: string;
}