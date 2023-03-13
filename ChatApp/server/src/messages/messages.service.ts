import { MessageDto } from './dto/message.dto';
import { Message } from './messages.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>,
              private userService: UsersService) {} 

  async getMessages() {
    const messages = await this.messagesRepository.find({relations: {author: true}});
    return messages;
  }

  async createMessage(dto: MessageDto) {
    const message = new Message();
    message.text = dto.text;
    message.author = await this.userService.getUserById(dto.authorId);
    const savedMessage = this.messagesRepository.save(message);
    return savedMessage;
  }
}