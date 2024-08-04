import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Product } from './product.entity'

@Unique(['name'])
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @ManyToMany(() => Product, (product) => product.categories)
  products?: Product[]
}
