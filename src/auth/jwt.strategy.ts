import { PassportStrategy } from "@nestjs/passport";

import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        })
    }

    async validate(payload: JwtPayload) {
        const { username } = payload
        const user = await this.authService.findOne({ username })

        if (!user)
            throw new UnauthorizedException('invalid credentials')
        return user;

    }
}