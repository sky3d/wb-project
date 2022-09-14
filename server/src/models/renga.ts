import { Entity, Column } from 'typeorm'
import { RengaStatus } from '../interfaces'
import { AbstractBaseEntity } from './baseEntity'

@Entity()
export class Renga extends AbstractBaseEntity {
  @Column()
  public name: string

  @Column({ default: 0 })
  public status: RengaStatus

  @Column({ nullable: true })
  public description: string
}
