import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsInt } from "class-validator";
import { CreateStoke } from 'src/stokes/dto/stokes.dto';

export class ProductDTO {
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
    @IsInt()
    quantity_disponible: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number
}

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

    @ApiProperty()
    stoke: CreateStoke
}

export class UpdateProduct {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}