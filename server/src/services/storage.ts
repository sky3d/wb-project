import { createConnection, getConnection, getRepository } from 'typeorm'

import { typeorm as config } from '../configs/typeorm'
import { Renga } from '../models/renga'

export class StorageService {
  public connect = async () => {
    const conn = await createConnection({ ...config })

    // console.log('Migrating...')
    let res
    try {
      res = await conn.runMigrations()
    } catch (e) {
      // console.error('Migration failed', e)
      process.exit(1)
    }

    // console.log(`[x] ${res?.length} migrations applied!`)
    return conn
  }

  public disconnect = async (): Promise<any> => {
    try {
      const conn = await getConnection()
      await conn.close()
    } catch (e) {
      // console.log('error %j', e)
    }
  }

  // renga
  public createRenga = (data: Partial<Renga>): Promise<Renga> => {
    const { manager } = getConnection()
    console.log('---------------', data)
    const entity = manager.create(Renga, data)
    return manager.save(entity)
  }

  public list = async (): Promise<Renga[]> => {
    const con = getRepository(Renga)
    return con.createQueryBuilder().getMany()
  }
}
