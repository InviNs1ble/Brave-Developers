import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class MessageDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя, отправившего сообщение'})
    @IsNumber({}, {message: 'Должно быть числом'})
    @IsDefined()
    readonly authorId: number;
    @ApiProperty({example: 'message', description: 'Сообщение пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @IsDefined()
    readonly text: string;
}