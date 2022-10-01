import { head } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { RenkuApp } from '../../module'
import { StorageService } from '../storage'
import { Variant as Model } from '../../models/variant'

export class Variant extends StorageService<Model> {
  public static kName = 'variant'

  public readonly config: any
  public readonly log: any

  constructor(parent: RenkuApp) {
    super()

    this.log = parent.log.child({ module: '@variant' })
    //@ts-ignore
    this.config = parent.config
    this.log.info('variant service created')
  }

  async connect() {
    // await super.connect()
  }

  async close() {
    // await super.close()
  }

  public byId = (id: Model['id']) => Model.findOneOrFail<Model>(id)

  public byNumber = (rengaId: string, number: number) => Model.findOneOrFail<Model>({ rengaId, number })

  // TODO to base storage
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

  public list = async (rengaId: string, number: number): Promise<Model[]> => {
    this.log.info('verse variants')

    const qb = getRepository(Model)
      .createQueryBuilder('v')
      .where('v.renga_id = :rengaId', { rengaId })
      .andWhere('v.number = :number', { number })
      .orderBy('v.created_at')

    return qb.getMany()

  }
}
