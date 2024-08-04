import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString } from 'class-validator'
import { Product } from 'src/entities/product.entity'

export class ProductImageResponse {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  imageUrl: string

  @ApiProperty()
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsArray()
  product: Product
}

export class ProductImageDelete {
  @ApiProperty()
  @IsString()
  message: string
}
