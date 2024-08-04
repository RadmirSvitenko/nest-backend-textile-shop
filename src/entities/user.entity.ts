import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column({ default: false })
  isActive: boolean
}
