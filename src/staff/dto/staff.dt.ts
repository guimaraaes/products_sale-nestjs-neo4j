import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { CreateCity } from 'src/cities/dto/cities.dto';
import { CreateStoke } from 'src/stokes/dto/stokes.dto';

export class CreateStaff {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    department: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    e_mail: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    city: CreateCity

    @ApiProperty()
    stoke: CreateStoke
}



