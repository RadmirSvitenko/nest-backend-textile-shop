import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class AddToCartDTO {
  @ApiProperty()
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number
}
