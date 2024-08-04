import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ProductTagResponse {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  value: string
}

export class ProductTagDelete {
  @ApiProperty()
  @IsString()
  message: string
}
