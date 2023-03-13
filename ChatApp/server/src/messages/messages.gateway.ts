import { UseGuards } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CLIENT_URI } from '../../constants';
import { Server, Socket } from "socket.io";
import { MessageDto } from 'src/messages/dto/message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: CLIENT_URI
  },
  serveClient: false,
  namespace: "chat"
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userName = client.handshake.query.username as string;
    const socketId = client.id;
    users[socketId] = userName;

    client.broadcast.emit("log", `${userName} подключился`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];

    client.broadcast.emit("log", `${userName} отключился`);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("messages:get")
  async handleMessagesGet(): Promise<void> {
    const messages = await this.messagesService.getMessages();
    this.server.emit("messages", messages);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("message:post")
  async handleMessagePost(@MessageBody() messageDto: MessageDto) {
    const createdMessage = await this.messagesService.createMessage(messageDto);
    this.server.emit("message:post", createdMessage);
    this.handleMessagesGet();
  }
}
