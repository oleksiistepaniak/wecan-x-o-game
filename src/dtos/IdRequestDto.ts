import {IsNotEmpty, IsString} from "class-validator";

export class IdRequestDto {
    @IsNotEmpty({message: 'Identifier should not be empty!'})
    @IsString()
    id!: string;
}