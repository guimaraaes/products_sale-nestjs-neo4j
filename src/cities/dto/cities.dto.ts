import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCity{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;
}

