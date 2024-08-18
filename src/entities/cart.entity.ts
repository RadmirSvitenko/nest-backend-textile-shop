import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CartItem } from './cartItem.entity'
import { User } from './user.entity'

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, (user) => user.cart)
  user: User

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  cartItem: CartItem[]

  @Column({ type: 'int', default: 1 })
  quantity: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number
}
