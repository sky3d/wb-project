import { Entity, Column, Index } from 'typeorm'
import { RengaRole } from '../interfaces'
import { RengaBaseEntity } from './rengaBase'

@Entity({name: 'renga_user'})
@Index(['rengaId', 'userId'], { unique: true })
export class RengaUser extends RengaBaseEntity {
  @Column({ name: 'user_id' })
  public userId: string

  @Column({ name: 'role' })
  public role: RengaRole
}
