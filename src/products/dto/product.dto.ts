import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';
import { Product} from '../interface/product.interface'

export class CreateProductDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Product)
    @ApiProperty()
    product: Product
}

export class UpdateProductDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Product)
    @ApiProperty()
    product: Product
}
