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
                where: {
                    login: req.login,
                pwdHash: hashPwd(req.pwd),
                },
                relations: ['group']
            });
            console.log(user);
            if(!user) {
                return res.json({error: 'Nieprawidłowy login lub hasło!'});
            }
            await this.createToken(await this.generateToken(user));
            let userGroupID,
                groupTitle,
                groupDescription,
                groupTag;
            if(user.group !== null) {
                userGroupID = user.group.id;
                groupTitle = user.group.name;
                groupDescription = user.group.description;
                groupTag = user.group.tag;
            } else userGroupID = null;
            const userData = {userID: user.id, userToken: user.currentTokenId, userGroupID, groupTitle, groupDescription, groupTag};
            return res
                .json({ok:true, userData});
        } catch (e) {
            return res.json({error: e.message});
        }
    };
    async logout(id:string, res: Response) {
        try {
            const user = await User.findOne({id});
            user.currentTokenId = null;
            await user.save();
            return res.json({ok:true});
        } catch (e) {
            return res.json({error: e.message});
        }
    }
}
