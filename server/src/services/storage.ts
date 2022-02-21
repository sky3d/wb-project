import { createConnection, getConnection } from 'typeorm'
import { Renga } from '../models/renga'
import { typeorm as config } from '../configs/typeorm'

export class StorageService {
  public createRenga = (data: Partial<Renga>): Promise<Renga> => {
    const { manager } = getConnection()

    const entity = manager.create(Renga, data)
    return manager.save(entity)
  }

  public connect = async () => {
    const conn = await createConnection({ ...config })

    console.log('Migrating...')
    let res
    try {
      res = await conn.runMigrations()
    } catch (e) {
      console.error('Migration failed', e)
      process.exit(1)
    }

    console.log(`[x] ${res?.length} migrations applied!`)
    return conn
  }

  public disconnect = async (): Promise<any> => {
    try {
      const conn = await getConnection()
      await conn.close()
    } catch (e) {
      console.log('error %j', e)
    }
  }
}
