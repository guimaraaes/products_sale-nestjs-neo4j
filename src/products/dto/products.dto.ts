import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsInt } from "class-validator";

export class CreateProduct {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number

}

export class UpdateProduct {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}