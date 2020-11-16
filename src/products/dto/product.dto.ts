import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';
 

export class ProductDTO{
    @IsObject()
    @ValidateNested()
    // @Type(() => Product)
    @ApiProperty()
    name: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    quantity_disponible: number;
    @ApiProperty()
    price: number
}

export class CreateProduct{
    @IsObject()
    @ValidateNested()
    // @Type(() => Product)
    @ApiProperty()
    name: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number
}

export class UpdateProduct{
    @IsObject()
    @ValidateNested()
    // @Type(() => Product)
    @ApiProperty()
    name: string;
}