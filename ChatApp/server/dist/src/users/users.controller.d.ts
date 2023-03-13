import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: UserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
}
