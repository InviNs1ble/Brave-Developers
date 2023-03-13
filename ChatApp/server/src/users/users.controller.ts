import { ValidationPipe } from './../pipes/validation-pipe';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Получение пользователя по id'})
    @ApiResponse({status: 200, type: [User]})
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }
}
