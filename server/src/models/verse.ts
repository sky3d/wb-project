import { Entity, Column, Index } from 'typeorm'
import {
  VerseMeta,
  VerseFormat,
  VerseSeason,
  VerseTopics
} from '../interfaces'

import { RengaBaseEntity } from './rengaBaseEntity'

@Entity()
@Index(['rengaId', 'number'], { unique: true })
export class Verse extends RengaBaseEntity {
  @Column()
  public name: string

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public meta: VerseMeta

  @Column({ type: 'integer' })
  public number: number

  @Column({
    type: 'enum',
    enum: VerseSeason,
    default: VerseSeason.None
  })
  public season: VerseSeason

  @Column({
    type: 'enum',
    enum: VerseFormat,
    default: VerseFormat.TwoLine
  })
  public format: VerseFormat

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public topics: VerseTopics

  @Column()
  public line1: string

  @Column({ nullable: true })
  public line2: string

  @Column({ nullable: true })
  public line3: string

  @Column()
  public active: boolean
}
