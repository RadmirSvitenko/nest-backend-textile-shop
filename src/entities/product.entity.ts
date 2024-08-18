import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Unique,
  ManyToOne,
} from 'typeorm'
import { Tag } from './tag.entity'
import { Image } from './image.entity'
import { Category } from './category.entity'
import { CartItem } from './cartItem.entity'

@Unique(['title'])
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string

  @Column('varchar')
  description: string

  @Column('int')
  price: number

  @Column('varchar')
  discount: string

  @Column('int', { nullable: true })
  rating?: number

  @ManyToMany(() => Tag, (tag) => tag.products, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  tags?: Tag[]

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
    nullable: true,
  })
  images?: Image[]

  @ManyToMany(() => Category, (category) => category.products, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  categories?: Category[]

  @Column('varchar')
  brand: string

  @ManyToOne(() => CartItem, (cartItem) => cartItem.product, {
    nullable: true,
    cascade: true,
  })
  cartItem: CartItem
}
