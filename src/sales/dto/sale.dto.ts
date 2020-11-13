import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';


export class SaleDTO {
    @IsObject()
    @ValidateNested()
    // @Type(() => Sale)
    @ApiProperty()
    total_sale: string;
    @ApiProperty()
    type_payment: string;
    @ApiProperty()
    quantity_parcels: string;
}


