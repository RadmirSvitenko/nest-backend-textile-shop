import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { UserController } from './user.controller'
import { CartModule } from '../cart/cart.module'
import { Cart } from 'src/entities/cart.entity'
import { CartItemModule } from '../cart-item/cart-item.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CartModule),
    forwardRef(() => CartItemModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
