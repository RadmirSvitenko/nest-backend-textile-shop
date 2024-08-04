import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  discount?: string

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  tags?: number[]

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  images?: number[]

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  categories?: number[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number
}

export class UpdateProductDTO {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  discount?: string

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  tagIds?: number[]

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  imageIds?: number[]

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  categoryIds?: number[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number
}

export class GetOneProductDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}

export class DeleteProductDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}
