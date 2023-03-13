import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async createUser(dto: UserDto){
        const user = new User();
        user.username = dto.username;
        user.password = dto.password;
        const savedUser = this.usersRepository.save(user);
        return savedUser;
    }

    async getAllUsers() {
        const users = await this.usersRepository.find();
        return users;
    }

    async getUserById(id: number) {
        const user = await this.usersRepository.findOneBy({id: id});
        return user;
    }

    async getUserByUsername(username: string) {
        const user = await this.usersRepository.findOneBy({username: username});
        return user;
    }
}
