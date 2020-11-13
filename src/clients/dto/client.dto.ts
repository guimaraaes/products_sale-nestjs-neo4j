
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';
// import { Client} from '../interface/clients.interface'

export class ClientDTO{
    @IsObject()
    @ValidateNested()
    // @Type(() => Client)
    @ApiProperty()
    name: string;
    @ApiProperty()
    cpf: string;
    @ApiProperty()
    adress: string;
}

// export class UpdateClientDTO{
//     @IsObject()
//     @ValidateNested()
//     @Type(() => Client)
//     @ApiProperty()
//     product: Client
// }
