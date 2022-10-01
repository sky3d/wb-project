import { Entity, Column, Index } from 'typeorm'

import { VerseNumberedEntity } from './verseBase'

@Entity()
@Index(['rengaId', 'number'])
export class Variant extends VerseNumberedEntity {
  @Column({ nullable: true })
  public text: string

  @Column({ nullable: true })
  public author: string
}
