import { User } from '../users/users.entity';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import { UserDto } from 'src/users/dto/user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: UserDto): Promise<{
        token: string;
    }>;
    registration(userDto: UserDto): Promise<{
        token: string;
    }>;
    generateToken(user: User): Promise<{
        token: string;
    }>;
    private validateUser;
}
