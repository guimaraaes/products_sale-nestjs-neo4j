import { ApiProperty } from '@nestjs/swagger';

export class Sale {
    name_client: string;
    product_id: number;
    total_sale: number;
    type_payment: number;
    quantity_parcels: number;
}