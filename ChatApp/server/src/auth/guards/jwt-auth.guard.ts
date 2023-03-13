import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { Observable } from "rxjs";
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToWs().getClient();
        try {
            const authHeader: string = req.handshake.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'});
        }
    }
}