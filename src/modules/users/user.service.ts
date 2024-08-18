import { CartService } from './../cart/cart.service'
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
    private readonly cartService: CartService,
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

    await this.cartService.createCart(newUser.id)
    const userCart = await this.cartService.getCartByUserId(newUser.id)

    await this.userRepository.save({
      username: dto.username,
      email: dto.email,
      password: hashDtoPassword,
      cart: userCart,
    })

    return {
      username: dto.username,
      email: dto.email,
      cart: userCart,
      message: AppMessage.USER_CREATED,
    }
  }

  async publicResponseUser(findEmail: string) {
    const findUser = await this.userRepository.findOne({
      where: { email: findEmail },
    })

    if (findUser)
      return {
        username: findUser.username,
        email: findUser.email,
        cart: findUser.cart,
        isActive: (findUser.isActive = true),
      }
  }
}
