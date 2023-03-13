import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { MessageDto } from 'src/messages/dto/message.dto';
import { MessagesService } from 'src/messages/messages.service';
export declare class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessagesGet(): Promise<void>;
    handleMessagePost(messageDto: MessageDto): Promise<void>;
}
