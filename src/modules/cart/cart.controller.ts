import { CartService } from './cart.service'
import { Body, Controller, Post } from '@nestjs/common'
import { Cart } from 'src/entities/cart.entity'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @ApiTags('Cart')
  @ApiResponse({ status: 201, type: Cart })
  @Post('add')
  async addToCart(@Body() userId: number): Promise<Cart> {
    return this.cartService.createCart(userId)
  }
}
