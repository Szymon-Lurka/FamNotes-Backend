import {Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { User } from '../user/user.entity';

export interface JwtPayload {
    id:string;
}

function cookieExtractor(req:any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: 'IUHN*)&AD *)g 8aD&G*&A(DGH *D&AHDA &*(HS AOUIDBAN(Y&DAG HOUIDSAH(&^DAG D(A&T^DT&DT)GSABUYHACN)&*SY(*HNXAB(&T)X^GASA^XS',
        });
    }
    async validate(payload: JwtPayload, done: (error, user) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false);
        }
        const user = await User.findOne({currentTokenId: payload.id});
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
};

