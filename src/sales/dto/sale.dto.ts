import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';

import{ Sale } from '../interface/sales.interface'
export class CreateSaleDTO {
    @IsObject()
    @ValidateNested()
    @Type(() => Sale)
    @ApiProperty()
    sale: Sale
}

export class UpdateProductDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Sale)
    @ApiProperty()
    sale: Sale
}
