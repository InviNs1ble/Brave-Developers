import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { HttpCode } from '@nestjs/common/decorators';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация'})
    @ApiResponse({status: 200})
    @HttpCode(200)
    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 201})
    @Post('/register')
    registration(@Body() userDto: UserDto) {
        return this.authService.registration(userDto);
    }
}
