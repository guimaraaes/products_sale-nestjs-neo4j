import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class Sale {
    @IsNotEmpty()
    @ApiProperty()
    name_client: string;
    @ApiProperty()
    product_id: number;
    @ApiProperty()
    total_sale: number;
    @ApiProperty()
    type_payment: number;
    @ApiProperty()
    quantity_parcels: number;
}