import { ApiProperty } from "@nestjs/swagger";
import { User } from 'src/users/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('messages')
export class Message{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя, отправившего сообщение'})
    @ManyToOne(() => User, (author: User) => author.messages)
    author: User;

    @ApiProperty({example: 'message', description: 'Сообщение пользователя'})
    @Column()
    text: string;

    @ApiProperty({example: '---', description: 'Дата и время отправки сообщения'})
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date
}