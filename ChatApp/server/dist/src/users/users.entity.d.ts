import { Message } from '../messages/messages.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    messages: Message[];
}
