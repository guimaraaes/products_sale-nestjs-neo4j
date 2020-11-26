import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface';
import { Credential } from './dto/auth.dto'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }


    async findOne({ username: string }): Promise<string> {

        return 'a'

    }
    async singIn(credentials: Credential): Promise<{ acessToken: string }> {
        const username = await this.validateUserPassword(credentials)



        if (!username)
            throw new UnauthorizedException('Invalida Credentials')

        const payload: JwtPayload = { username }
        const acessToken = await this.jwtService.sign(payload)

        return { acessToken }
    }

    async singUp(credentials: Credential): Promise<{ acessToken: string }> {
        const { username, password } = credentials

        const salt = bcrypt.genSalt();

        // password = this.hashPassword(password, salt)


        if (!username)
            throw new UnauthorizedException('Invalida Credentials')

        const payload: JwtPayload = { username }
        const acessToken = await this.jwtService.sign(payload)

        return { acessToken }
    }


    async validateUserPassword(credentials: Credential): Promise<string> {
        const { username, password } = credentials
        return 'true'
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hast(password, salt);


    }
}
