import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";
import { CreateCity } from 'src/cities/dto/cities.dto';

export class CreateClient {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty()
    adress: CreateCity
}


export class UpdateClient {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adress: CreateCity;
}

