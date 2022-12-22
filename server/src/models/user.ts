import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserProfile } from '../interfaces'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ nullable: true })
  public name: string

  @Column({ nullable: true })
  public avatar: string

  @Column({ name: 'provider_id', nullable: true })
  public providerId: string

  @Column({
    name: 'profile',
    nullable: true,
    type: 'jsonb',
  })
  public profile: UserProfile
}
