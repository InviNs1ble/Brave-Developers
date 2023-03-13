import { MessageDto } from './dto/message.dto';
import { Message } from './messages.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
export declare class MessagesService {
    private messagesRepository;
    private userService;
    constructor(messagesRepository: Repository<Message>, userService: UsersService);
    getMessages(): Promise<Message[]>;
    createMessage(dto: MessageDto): Promise<Message>;
}
