import { Column } from 'typeorm'
import { RengaBaseEntity } from './rengaBase'

export class VerseNumberedEntity extends RengaBaseEntity {
  @Column({ type: 'integer' })
  public number: number
}
