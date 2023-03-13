import { Message } from '../messages/messages.entity';
import { AuthModule } from './../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Message]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
