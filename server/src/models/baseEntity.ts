import {
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm'

export abstract class AbstractBaseEntity extends BaseEntity {
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
