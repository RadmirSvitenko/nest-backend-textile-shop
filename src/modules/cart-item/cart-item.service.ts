import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/entities/product.entity'
import { Repository } from 'typeorm'
import { Cart } from 'src/entities/cart.entity'
import { CartItem } from 'src/entities/cartItem.entity'
import { JwtService } from '@nestjs/jwt'
import { AddToCartDTO } from './dto'

@Injectable()
export class CartItemService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(dto: AddToCartDTO): Promise<Cart> {
    const userId = 1

    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    })

    if (!cart) {
      cart = this.cartRepository.create({
        user: { id: userId },
        cartItem: [],
      })
      cart = await this.cartRepository.save(cart)
    }

    const findProduct = await this.productRepository.findOne({
      where: { id: dto.productId },
    })

    if (!findProduct) throw new NotFoundException()

    let cartItem = cart.cartItem.find(
      (item) => item.product.id === dto.productId,
    )

    if (cartItem) {
      cartItem.quantity += dto.quantity
      cartItem.totalPrice = cartItem.quantity * findProduct.price
    } else {
      cartItem = this.cartItemRepository.create({
        cart: cart,
        product: findProduct,
        quantity: dto.quantity,
        totalPrice: dto.quantity * findProduct.price,
      })
      cart.cartItem.push(cartItem)
    }

    cart.totalPrice = cart.cartItem.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    )

    await this.cartItemRepository.save(cartItem)
    await this.cartRepository.save(cart)

    return cart
  }

  async getAllItems(): Promise<CartItem[]> {
    const allItems = await this.cartItemRepository.find()
    return allItems
  }
}
