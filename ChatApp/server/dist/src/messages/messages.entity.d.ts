import { User } from 'src/users/users.entity';
export declare class Message {
    id: number;
    author: User;
    text: string;
    createdAt: Date;
}
