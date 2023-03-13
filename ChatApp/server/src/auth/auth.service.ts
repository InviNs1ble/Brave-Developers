import { User } from '../users/users.entity';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UserDto } from 'src/users/dto/user.dto';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from 'bcryptjs'
 
@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: UserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: UserDto) {
        const candidate = await this.userService.getUserByUsername(userDto.username);
        if(candidate) {
            throw new HttpException('Пользователь с таким именем уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = { id: user.id, username: user.username };
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: UserDto) {
        const user = await this.userService.getUserByUsername(userDto.username);        
        if(user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if(passwordEquals) {
                return user;
            }
        }
        throw new UnauthorizedException({message: 'Неверный email или пароль'});
    }
}
