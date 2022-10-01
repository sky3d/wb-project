import { head } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { Renku } from '../../main'
import { StorageService } from '../storage'
import { Verse as Model } from '../../models/verse'


export class Verse extends StorageService<Model> {
  public static kName = 'verse'

  public readonly config: any
  public readonly log: any

  constructor(parent: Renku) {
    super()

    this.log = parent.log.child({ module: '@verse' })
    //@ts-ignore
    this.config = parent.config
    this.log.info('verse service created')
  }

  async connect() {
    // await super.connect()
  }

  async close() {
    // await super.close()
  }

  public byId = (id: Model['id']) => Model.findOneOrFail<Model>(id)

  public byNumber = (rengaId: string, number: number) => Model.findOneOrFail<Model>({ rengaId, number })

  public remove = async (id: Model['id']) => {
    const res = await getManager()
      .createQueryBuilder()
      .delete()
      .from(Model)
      .where('id = :id', { id })
      .execute()

    this.log.info({ id }, 'verse removed')
    return { affected: res.affected }
  }

  public create = async (data: Partial<Model>): Promise<Model> => {
    const res = await getManager()
      .createQueryBuilder()
      .insert()
      .into(Model)
      .values(data)
      .returning('*')
      .execute()

    return head(res.generatedMaps) as Model
  }

  public update = async (verseId: string, data: Partial<Model>): Promise<Model> => {
    const res = await getManager()
      .createQueryBuilder()
      .update(Model)
      .set(data)
      .where({ id: verseId })
      .execute()

    return this.byId(verseId)
  }

  public list = async (rengaId: string): Promise<Model[]> => {
    this.log.info('verse list by renga')

    const qb = getRepository(Model)
      .createQueryBuilder('v')
      .where('v.renga_id = :rengaId', { rengaId })
      .orderBy('v.number')

    return qb.getMany()

  }
}
