import { Column } from 'typeorm'
import { AbstractBaseEntity } from './baseEntity'

export class RengaBaseEntity extends AbstractBaseEntity {
  @Column({ name: 'renga_id' })
  public rengaId: string
}
