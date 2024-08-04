import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../users/user.service'
import { CreateUserDTO } from '../users/dto'
import { AppMessage } from 'src/common/constants'
import { LoginUserDTO } from './dto'
import { AuthUserResponse } from './response'
import * as bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service'
import { RegisterUserResponse } from '../users/response'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<RegisterUserResponse> {
    const existUser = await this.userService.findUsersByEmail(dto.email)
    if (existUser) throw new BadRequestException(AppMessage.USER_EXIST)
    return this.userService.createUser(dto)
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUsersByEmail(dto.email)
    if (!existUser) throw new BadRequestException(AppMessage.USER_NOT_EXIST)
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    )
    if (!validatePassword) throw new BadRequestException(AppMessage.WRONG_DATA)
    const userData = {
      name: existUser.username,
      email: existUser.email,
    }
    const token = await this.tokenService.generateJwtToken(userData)
    const responseUser = await this.userService.publicResponseUser(dto.email)
    const cart = []
    return { ...responseUser, token, cart }
  }
}
