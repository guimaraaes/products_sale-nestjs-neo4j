import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Credential, CreateStaff } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('stokes')

@Controller('staff/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/singup')
    postSingUp(@Body() credential: CreateStaff): Promise<{ acessToken: string }> {
        return this.authService.singUp(credential)
    }
    @ApiBearerAuth()
    @Post('/singin')
    postSingIn(@Body() credential: Credential): Promise<{ acessToken: string }> {
        return this.authService.singIn(credential)
    }
    @ApiBearerAuth()
    @Get('/test')
    @UseGuards(AuthGuard('jwt'))
    get() {

    }
}
