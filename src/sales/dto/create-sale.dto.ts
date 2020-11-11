import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDTO {
    name_client: string;
    product_id: number;
    total_sale: number;
    type_payment: number;
    quantity_parcels: number;

}