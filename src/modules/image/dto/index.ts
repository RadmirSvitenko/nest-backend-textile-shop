import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateImageDTO {
  @ApiProperty()
  @IsString()
  imageUrl: string

  @ApiProperty({ type: Number })
  @IsNumber()
  productId: number
}

export class UpdateImageDTO {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  imageUrl: string

  @ApiProperty()
  @IsNumber()
  productId: number
}

export class GetOneImageDTO {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsNumber()
  productId: number
}

export class DeleteImageDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}
