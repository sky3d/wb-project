import {
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  PrimaryColumn,
  Column,
  Index,
} from 'typeorm'

export class AbstractBaseEntity extends BaseEntity {
  @PrimaryColumn()
  public id: string

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  public updatedAt: Date
}
