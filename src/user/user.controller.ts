import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {RegisterDto} from './dto/register.dto';
import {RegisterUserResponse} from '../interface/user';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {}

    @Post('/register')
    register(
        @Body() newUser: RegisterDto,
    ): Promise<string | RegisterUserResponse> {
        return this.userService.register(newUser);
    }
}
