import { Body, Controller, Get, Post } from '@nestjs/common'
import { CartItemService } from './cart-item.service'
import { AddToCartDTO } from './dto'
import { Cart } from 'src/entities/cart.entity'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CartItem } from 'src/entities/cartItem.entity'

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiTags('CartItem')
  @ApiResponse({ status: 200, type: AddToCartDTO })
  @Post('add')
  async add(@Body() dto: AddToCartDTO): Promise<Cart> {
    return this.cartItemService.addToCart(dto)
  }

  @ApiTags('CartItem')
  @ApiResponse({ status: 200, type: [AddToCartDTO] })
  @Get('get')
  async getAll(): Promise<CartItem[]> {
    return this.cartItemService.getAllItems()
  }
}
