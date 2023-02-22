import {
  Entity,
  Column,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { RengaRole } from '../interfaces'

@Entity({ name: 'renga_user' })
@Index(['rengaId', 'userId'], { unique: true })
export class RengaUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string

  @Column({ name: 'renga_id' })
  public rengaId: string

  @Column({ name: 'user_id' })
  public userId: string

  @Column({ name: 'role', default: 1 })
  public role: RengaRole
}
