import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateTagDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  value: string

  @ApiProperty()
  @IsNumber()
  productId: number
}

export class UpdateTagDTO {
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

export class GetOneTagDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}

export class DeleteTagDTO {
  @ApiProperty()
  @IsNumber()
  id: number
}
