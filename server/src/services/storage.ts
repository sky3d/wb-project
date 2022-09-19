import { head } from 'lodash'
import {
  createConnection,
  getConnection,
  getManager,
  getRepository
} from 'typeorm'
import { typeorm as config } from '../configs/typeorm'
import { Renga } from '../models/renga'

export class StorageService {
  public connect = async () => {
    const conn = await createConnection({ ...config })

    /* eslint-disable no-console */
    console.log('Migrating...')
    let res = []
    try {
      res = await conn.runMigrations()
    } catch (e) {
      console.error('Migration failed', e)
      process.exit(1)
    }

    /* eslint-disable no-console */
    console.log(`[x] ${res?.length} migrations applied!`)
    return conn
  }

  public disconnect = async (): Promise<any> => {
    try {
      const conn = await getConnection()
      await conn.close()
    } catch (e) {
      // console.log(e)
    }
  }

  // renga

  public getRenga = (rengaId: Renga['id']) => Renga.findOneOrFail<Renga>(rengaId)

  public createRenga = async (data: Partial<Renga>): Promise<Renga> => {
    // const { manager } = getConnection()
    // const entity = manager.create(Renga, data)
    // return manager.save(entity)

    const res = await getManager()
      .createQueryBuilder()
      .insert()
      .into(Renga)
      .values(data)
      .returning('*')
      .execute()

    return head(res.generatedMaps) as Renga
  }

  public updateRenga = async (rengaId: Renga['id'], data: Partial<Renga>): Promise<Renga> => {
    await getManager()
      .createQueryBuilder()
      .update(Renga)
      .set(data)
      .where({ id: rengaId })
      .execute()

    return this.getRenga(rengaId)
  }

  public list = async (): Promise<Renga[]> => {
    const con = getRepository(Renga)
    return con.createQueryBuilder().getMany()
  }
}
