import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Credential } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('singin')
    postSingIn(@Body() credential: Credential): Promise<{ acessToken: string }> {
        return this.authService.singIn(credential)
    }

    @Get('/test')
    @UseGuards(AuthGuard('jwt'))
    get() {

    }
}
