import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';


export class SaleDTO {
    @IsObject()
    @ValidateNested()
    // @Type(() => Sale)
    @ApiProperty()
    type_payment: string;
    @ApiProperty()
    quantity_parcels: number;
    @ApiProperty()
    total_sale: number;
    @ApiProperty()
    quantity_sale: number;
}

export class CreateSale {
    @IsObject()
    @ValidateNested()
    // @Type(() => Sale)
    @ApiProperty()
    type_payment: string;
    @ApiProperty()
    quantity_parcels: number;
    @ApiProperty()
    total_sale: number;
    @ApiProperty()
    quantity_sale: number;
}
