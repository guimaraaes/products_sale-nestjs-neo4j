import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,  IsString, IsNumber, IsInt, IsDate, IsDateString } from "class-validator";
import { DateTime } from 'neo4j-driver';


export class CreateSale {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type_payment: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    quantity_parcels: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity_sale: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: Date;
}
