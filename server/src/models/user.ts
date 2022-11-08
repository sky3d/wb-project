import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ nullable: true })
  public provider: string

  @Column({ nullable: true })
  public providerId: string

  @Column({
    name: 'display_name',
    nullable: true,
  })
  public displayName: string

  @Column({ nullable: true })
  public token: string

  @Column({
    name: 'profile',
    nullable: true,
    type: 'jsonb',
  })
  public profile: Record<string, any>
}
