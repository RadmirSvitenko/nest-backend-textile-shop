import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from 'src/modules/users/dto/index'
import { RegisterUserResponse } from './response'
import { AppMessage } from 'src/common/constants'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  async findUsersByEmail(findEmail: string) {
    return this.userRepository.findOne({ where: { email: findEmail } })
  }

  async createUser(dto: CreateUserDTO): Promise<RegisterUserResponse> {
    const hashDtoPassword = await this.hashPassword(dto.password)

    const newUser = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashDtoPassword,
    })

    await this.userRepository.save(newUser)

    return {
      username: dto.username,
      email: dto.email,
      message: AppMessage.USER_CREATED,
    }
  }

  async publicResponseUser(findEmail: string) {
    const findUser = this.userRepository.findOne({
      where: { email: findEmail },
    })

    if (findUser)
      return {
        username: (await findUser).username,
        email: (await findUser).email,
        isActive: ((await findUser).isActive = true),
      }
  }
}
