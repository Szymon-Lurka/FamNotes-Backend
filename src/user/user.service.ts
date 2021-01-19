import { Injectable } from '@nestjs/common';
import { RegisterUserResponse } from 'src/interface/user';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UserService {
    filter(user:User):RegisterUserResponse {
        const {id, login} = user;
        return {id, login};
    }
    async register(newUser: RegisterDto): Promise<string | RegisterUserResponse> {
        const didExist = await User.findOne({login: newUser.login});
        if (didExist) {
            return 'Już istnieje taki użytkownik!'
        } else {
        const user = new User();
        user.login = newUser.login;
        user.pwdHash = hashPwd(newUser.pwd);
        await user.save();
        return this.filter(user);
    }
    }
}
