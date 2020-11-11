import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    cotation: number;
    @ApiProperty()
    image: string;
}