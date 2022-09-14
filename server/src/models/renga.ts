import { Entity, Column } from 'typeorm'
import { RengaOptions, RengaStatus } from '../interfaces'
import { AbstractBaseEntity } from './baseEntity'

@Entity()
export class Renga extends AbstractBaseEntity {
  @Column()
  public name: string

  @Column({ nullable: true })
  public description: string

  @Column({ type: 'integer', default: 0 })
  public status: RengaStatus

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public options: RengaOptions

  @Column()
  public owner: string
}
