import { head } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { RenkuApp } from '../../module'
import { StorageService } from '../storage'
import { Renga as Model } from '../../models/renga'
import { runInThisContext } from 'vm'

export class Renga extends StorageService<Model> {
  public static kName = 'renga'

  public readonly config: any
  public readonly log: any

  constructor(parent: RenkuApp) {
    super()

    this.log = parent.log.child({ module: '@renga' })
    //@ts-ignore
    this.config = parent.config
    this.log.info('renga service created')
  }

  async connect() {
    // await super.connect()
  }

  async close() {
    // await super.close()
  }

  public getRenga = (rengaId: Model['id']) => Model.findOneOrFail<Model>(rengaId)

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

  public update = async (rengaId: Model['id'], data: Partial<Model>): Promise<Model> => {
    await getManager()
      .createQueryBuilder()
      .update(Model)
      .set(data)
      .where({ id: rengaId })
      .execute()

    return this.getRenga(rengaId)
  }

  public list = async (): Promise<Model[]> => {
    this.log.info('renga list')

    const qb = getRepository(Model)
      .createQueryBuilder('r')

    // qb.
    //   .take(pageSize)
    //   .skip(page * pageSize)
    //   .orderBy({ [`f.${criteria}`]: order as any })

    return qb.getMany()
  }
}
