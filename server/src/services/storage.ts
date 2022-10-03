import { AbstractBaseEntity } from '../models/baseEntity'

export class StorageService<T extends AbstractBaseEntity> {
  // protected async count<T extends ObjectType<AbstractBaseEntity>>(entity: T): Promise<number> {
  //   return getConnection().getRepository<T>(entity).count()
  // }
}
