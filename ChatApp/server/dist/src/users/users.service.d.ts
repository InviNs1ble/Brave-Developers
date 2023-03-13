import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(dto: UserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
}
