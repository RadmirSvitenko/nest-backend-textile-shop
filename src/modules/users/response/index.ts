import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'
import { Cart } from 'src/entities/cart.entity'

export class RegisterUserResponse {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  message: string

  @ApiProperty()
  @IsArray()
  cart: Cart
}
