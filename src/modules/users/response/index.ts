import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

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
}
