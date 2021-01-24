import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiBadRequestResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Credential, CreateStaff } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'graphql';


@ApiTags('stokes')

@Controller('staff/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/singup')
    @ApiOperation({ summary: 'sing up (staff) on system' })
    @ApiCreatedResponse({ description: 'staff created' })
    @ApiForbiddenResponse({ description: 'email aready exists' })
    @ApiBadRequestResponse({ description: 'error on create staff' })
    postSingUp(@Body() credential: CreateStaff): Promise<{ acessToken: string }> {
        return this.authService.singUp(credential)
    }
    @ApiBearerAuth()
    @Post('/singin')
    @ApiOperation({ summary: 'sing in (staff) on system' })
    @ApiOkResponse({ description: 'acess tokens' })
    @ApiUnauthorizedResponse({ description: 'Invalida Credentials' })
    postSingIn(@Body() credential: Credential): Promise<{ acessToken: string }> {
        return this.authService.singIn(credential)
    }

    @ApiBearerAuth()
    @Get('/test')
    @UseGuards(AuthGuard('jwt'))
    get() {

    }
}
