import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString } from 'class-validator'
import { Category } from 'src/entities/category.entity'
import { Image } from 'src/entities/image.entity'
import { Tag } from 'src/entities/tag.entity'

export class ProductResponse {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsString()
  discount: string

  @ApiProperty()
  @IsNumber()
  rating: number

  @ApiProperty({ type: [Tag] })
  @IsArray()
  tags: Tag[]

  @ApiProperty({ type: [Image] })
  @IsArray()
  images: Image[]

  @ApiProperty({ type: [Category] })
  @IsArray()
  categories: Category[]

  @ApiProperty()
  @IsString()
  brand: string
}

export class ProductResponseDelete {
  @ApiProperty()
  @IsString()
  message: string
}
