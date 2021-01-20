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
        const regexSpecial = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        if (newUser.login.length < 4 || newUser.login.length > 10) {
            return 'Nazwa użytkownika powinna mieć minimum 4 znaki i maksymalnie 10 znaków!'
        };
        if (newUser.pwd.length < 8 || !!newUser.pwd.search(regexSpecial)) {
            return 'Hasło powinno zawierać minimum 8 znaków, 1 cyfrę i 1 znak specjalny!'
        };
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
