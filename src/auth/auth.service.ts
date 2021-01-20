import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { JwtPayload } from "./jwt.strategy";
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { hashPwd } from 'src/utils/hash-pwd';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private createToken(currentTokenId: string): {accessToken: string, expiresIn: number} {
        const payload: JwtPayload = {id: currentTokenId};
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, 'IUHN*)&AD *)g 8aD&G*&A(DGH *D&AHDA &*(HS AOUIDBAN(Y&DAG HOUIDSAH(&^DAG D(A&T^DT&DT)GSABUYHACN)&*SY(*HNXAB(&T)X^GASA^XS', {
            expiresIn
        });
        return {
            accessToken,
            expiresIn,
        };
    };

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({currentTokenId: token});
        } while (!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();
        return token;
    }
    async login(req:AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await User.findOne({
                login: req.login,
                pwdHash: hashPwd(req.pwd),
            });
            if(!user) {
                return res.json({error: 'Nieprawidłowy login lub hasło!'});
            }
            const token = await this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
                .json({ok:true});
        } catch (e) {
            return res.json({error: e.message});
        }
    };
    async logout(user:User, res: Response) {
        try {
            user.currentTokenId = null;
            await user.save();
            res.clearCookie(
                'jwt',
                {
                    secure:false,
                    domain:'localhost',
                    httpOnly:true,
                }
            );
            return res.json({ok:true});
        } catch (e) {
            return res.json({error: e.message});
        }
    }
}
