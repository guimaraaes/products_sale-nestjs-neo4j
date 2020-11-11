import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    mean_time_topay: number;
    @ApiProperty()
    total_sales_topay: number;
    @ApiProperty()
    total_sales: number;
}