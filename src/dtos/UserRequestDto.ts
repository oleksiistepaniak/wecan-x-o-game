import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UserRequestDto {
    @IsEmail({}, {message: 'You have entered an invalid email!'})
    email!: string;
    @IsNotEmpty({message: 'Username should not be empty!'})
    @MinLength(3, {message: 'Username must be greater than 3 characters!'})
    @MaxLength(20, {message: 'Username must be less than 20 characters!'})
    @IsString()
    @Matches(/^[a-zA-Z]+$/, {message: 'Username must include only latin letters!'})
    username!: string;
    @IsNotEmpty({message: 'Password should not be empty!'})
    @MinLength(6, {message: 'Password must be greater than 6 characters!'})
    @MaxLength(20, {message: 'Password must be less than 20 characters!'})
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        { message: 'The password must contain uppercase letters, lowercase letters, and digits!' })
    password!: string;
}