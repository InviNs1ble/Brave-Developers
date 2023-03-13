import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength } from "class-validator";

export class UserDto {
    @ApiProperty({example: 'nickname', description: 'Имя пользователя'})
    @IsString({message: 'Должен быть строкой'})
    @IsDefined()
    readonly username: string;
    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    @IsString({message: 'Должен быть строкой'})
    @MinLength(8, {message: 'Длина пароля не менее 8 символов'})
    @IsDefined()
    readonly password: string;
}