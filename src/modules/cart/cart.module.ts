import { forwardRef, Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from 'src/entities/cart.entity'
import { Product } from 'src/entities/product.entity'
import { CartItem } from 'src/entities/cartItem.entity'
import { UserModule } from '../users/user.module'
import { CartItemModule } from '../cart-item/cart-item.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product]),
    forwardRef(() => UserModule),
    forwardRef(() => CartItemModule),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
