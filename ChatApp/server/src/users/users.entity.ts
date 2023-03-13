import { Message } from '../messages/messages.entity';
import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'nickname', description: 'Имя пользователя'})
    @Column({ unique: true })
    username: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    @Column()
    password: string;

    @OneToMany(() => Message, (message: Message) => message.author)
    messages: Message[];
}