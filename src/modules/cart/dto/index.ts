import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CreateCartDTO {
  @ApiProperty({ type: Number })
  @IsNumber()
  userId: number
}
