import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { UserObj } from 'src/decorators/user-obj.decorator';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(
        @Body() req: AuthLoginDto,
        @Res() res: Response,
    ): Promise<any> {
        return this.authService.login(req, res);
    }
    @Get('/logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@UserObj() user: User, @Res() res: Response) {
        console.log('próbujemy się wylogowac');
        return this.authService.logout(user, res);
    }
}
