import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: UserDto): Promise<{
        token: string;
    }>;
    registration(userDto: UserDto): Promise<{
        token: string;
    }>;
}
