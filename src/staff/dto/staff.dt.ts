import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateStaff{
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
}



