import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  value: string

  @ManyToMany(() => Product, (product) => product.tags)
  products?: Product[]
}
