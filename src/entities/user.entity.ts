import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Cart } from './cart.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  username: string

  @Column('varchar')
  email: string

  @Column('varchar')
  password: string

  @OneToOne(() => Cart, { eager: true, cascade: true })
  @JoinColumn()
  cart: Cart

  @Column({ default: false })
  isActive: boolean
}
