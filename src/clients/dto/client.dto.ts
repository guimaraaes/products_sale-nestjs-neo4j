
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';
import { Client} from '../interface/clients.interface'

export class CreateClientDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Client)
    @ApiProperty()
    product: Client
}

export class UpdateClientDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Client)
    @ApiProperty()
    product: Client
}
