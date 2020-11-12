
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Product{
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @ApiProperty()
    cotation: number;
    @ApiProperty()
    image: string;
}

export class CreateProductDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Product)
    @ApiProperty()
    product: Product
}