import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ProductCategoryResponse {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  name: string
}

export class ProductCategoryDelete {
  @ApiProperty()
  @IsString()
  message: string
}
