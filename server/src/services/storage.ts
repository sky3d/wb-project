import { BaseEntity } from 'typeorm'

export class StorageService<T extends BaseEntity> {
  // protected async count<T extends ObjectType<AbstractBaseEntity>>(entity: T): Promise<number> {
  //   return getConnection().getRepository<T>(entity).count()
  // }
}
