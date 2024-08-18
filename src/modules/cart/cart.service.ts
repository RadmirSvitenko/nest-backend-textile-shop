import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cart } from 'src/entities/cart.entity'
import { Repository } from 'typeorm'
import { CartItem } from 'src/entities/cartItem.entity'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    // @InjectRepository(Product)
    // private readonly productRepository: Repository<Product>,
  ) {}

  async createCart(userId: number): Promise<Cart> {
    const newCart = this.cartRepository.create({ id: userId })
    return this.cartRepository.save(newCart)
  }

  async getCartByUserId(userId: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { id: userId },
      relations: ['cartItems'],
    })
  }
}
