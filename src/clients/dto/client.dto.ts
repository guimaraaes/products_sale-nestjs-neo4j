import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClient{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adress: string;
}


export class UpdateClient{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adress: string;
}

