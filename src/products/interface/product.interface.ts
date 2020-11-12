import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class Product{
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @ApiProperty()
    cotation: number;
    @ApiProperty()
    image: string;
}