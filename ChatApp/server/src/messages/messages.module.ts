import { MessagesGateway } from './messages.gateway';
import { forwardRef, Module } from "@nestjs/common";
import { User } from "src/users/users.entity";
import { Message } from "./messages.entity";
import { MessagesService } from "./messages.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [],
    providers: [MessagesService, MessagesGateway],
    imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => AuthModule),
      TypeOrmModule.forFeature([User, Message]),
    ]
  })
  export class MessagesModule {}