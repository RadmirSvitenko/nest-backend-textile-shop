import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CreateUserDTO } from '../users/dto'
import { AuthUserResponse } from './response'
import { LoginUserDTO } from './dto'
import { jwtAuthGuard } from 'src/guards/jwt-guard'
import { RegisterUserResponse } from '../users/response'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Authentication')
  @ApiResponse({ status: 201, type: RegisterUserResponse })
  @Post('sign-up')
  signUp(@Body() dto: CreateUserDTO): Promise<RegisterUserResponse> {
    return this.authService.registerUsers(dto)
  }

  @ApiTags('Authentication')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('sign-in')
  signIn(@Body() dto: LoginUserDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto)
  }

  @ApiTags('test')
  @UseGuards(jwtAuthGuard)
  @Post('test')
  test() {
    return true
  }
}
