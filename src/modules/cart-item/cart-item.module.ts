import { forwardRef, Module } from '@nestjs/common'
import { CartItemController } from './cart-item.controller'
import { CartItemService } from './cart-item.service'
import { CartItem } from 'src/entities/cartItem.entity'
import { Cart } from 'src/entities/cart.entity'
import { Product } from 'src/entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartModule } from '../cart/cart.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, Cart, Product]),
    forwardRef(() => CartModule),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret_jwt'),
        signOptions: { expiresIn: configService.get<string>('expire_jwt') },
      }),
    }),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
