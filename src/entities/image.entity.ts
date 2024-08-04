import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm'
import { Product } from './product.entity'

@Unique(['imageUrl', 'product'])
@Entity()
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  imageUrl: string

  @Column({ nullable: true })
  productId: number

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'productId' })
  product: Product
}
