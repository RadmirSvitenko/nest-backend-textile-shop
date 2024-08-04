import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsString } from 'class-validator'

export class AuthUserResponse {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsBoolean()
  isActive: boolean

  @ApiProperty()
  @IsString()
  token: string

  @ApiProperty()
  @IsArray()
  cart: any[]
}
