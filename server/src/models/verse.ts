import { Entity, Column, Index } from 'typeorm'
import {
  VerseFormat,
  VerseSeason,
  VerseOptions,
  VerseTopics
} from '../interfaces'

import { VerseNumberedEntity } from './verseBase'

@Entity()
@Index(['rengaId', 'number'])
export class Verse extends VerseNumberedEntity {
  @Column({ nullable: true })
  public description: string

  @Column({ name: 'renga_part', type: 'int', default: 0 })
  public rengaPart: number

  @Column({
    type: 'enum',
    enum: VerseSeason,
    default: VerseSeason.None
  })
  public season: VerseSeason

  @Column({
    type: 'enum',
    enum: VerseFormat,
    default: VerseFormat.ThreeLines
  })
  public format: VerseFormat

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public topics: VerseTopics

  @Column({ nullable: true })
  public line1: string

  @Column({ nullable: true })
  public line2: string

  @Column({ nullable: true })
  public line3: string

  @Column({ nullable: true })
  public author: string

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public options: VerseOptions
}
