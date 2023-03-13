import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/messages.entity';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./users/users.entity";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [User, Message],
          synchronize: true
        }),
        UsersModule,
        AuthModule,
        MessagesModule
      ],
})
export class AppModule {}
