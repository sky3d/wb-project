import { getRepository } from 'typeorm'
import { AbstractBaseEntity } from '../models/baseEntity'

export class StorageService<T extends AbstractBaseEntity> {

  // public getRepository<T>() {
  //   return getRepository<T>()
  // }
}
