import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'
import { Cart } from './cart.entity'

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Cart, (cart) => cart.cartItem, { onDelete: 'CASCADE' })
  cart: Cart

  @ManyToOne(() => Product, { eager: true })
  product: Product

  @Column({ type: 'int', default: 1 })
  quantity: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number
}
