import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string
}
