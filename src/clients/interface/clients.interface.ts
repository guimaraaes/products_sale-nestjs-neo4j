import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class Client {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @ApiProperty()
    mean_time_to_pay: number;
    @ApiProperty()
    image: string;
}