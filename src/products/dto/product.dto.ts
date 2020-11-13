import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsObject } from "class-validator";
import { Type } from 'class-transformer';
// import { Product} from '../interface/product.interface'

// export class CreateProductDTO{
//     @IsObject()
//     @ValidateNested()
//     @Type(() => Product)
//     @ApiProperty()
//     product: Product
// }

export class ProductDTO{
    @IsObject()
    @ValidateNested()
    // @Type(() => Product)
    @ApiProperty()
     name: string;
    @ApiProperty()
    cotation: number;
    @ApiProperty()
    image: string;
}
