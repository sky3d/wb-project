import { Column } from 'typeorm'
import { AbstractBaseEntity } from './baseEntity'

export class RengaBaseEntity extends AbstractBaseEntity {
  @Column({ name: 'renga_id' })
  public rengaId: string

  @Column({ name: 'renga_part', type: 'int', default: 0 })
  public rengaPart: number
}
