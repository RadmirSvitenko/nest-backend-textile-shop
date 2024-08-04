import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateCategoryDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  productId: number
}

export class UpdateCategoryDTO {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  name: string
}

export class GetOneCategoryDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}

export class DeleteCategoryDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}
