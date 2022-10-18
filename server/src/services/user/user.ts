import { head, omit } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { Renku } from '../../main'
import { StorageService } from '../storage'
import { User as Model } from '../../models/user'

const SEPARATOR = '!'

export class User extends StorageService<Model> {
  public static kName = 'user'
  static makeInnerId = (provider: string, id: string) => `${provider}${SEPARATOR}${id}`  // vkontakte!746268548 sky3ddd

  public readonly config: any
  public readonly log: any

  constructor(parent: Renku) {
    super()

    this.log = parent.log.child({ module: '@user' })
    //@ts-ignore
    this.config = parent.config
    this.log.info('user service created')
  }

  async connect() {
    // await super.connect()
  }

  async close() {
    // await super.close()
  }

  public byId = (id: Model['id']) => Model.findOne<Model>(id)

  public byProvider = (socialId: Model['socialId'], provider: Model['provider']) => {
    const qb = getRepository(Model)
      .createQueryBuilder('u')
      .where('u.socialId = :socialId', { socialId })
      .andWhere('u.provider = :provider', { provider })

    return qb.getOne()
  }

  public async authenticateOnCreate(profile: any): Promise<[Error | undefined, Model | undefined]> {
    this.log.info('registering new user %j', profile)
    const { provider, id, displayName } = profile

    try {
      const candidate = await this.byProvider(id, provider)

      if (candidate) {
        return [undefined, candidate]
      }

      const data: Partial<Model> = {
        socialId: id,
        provider,
        displayName,
        profile: omit(profile, ['_raw', '_json'])
      }
      const user = await this.create(data)

      this.log.info('user created %s', user.id)

      return [undefined, user]

    } catch (e) {
      return [e as Error, undefined]
    }
  }

  public create = async (data: Partial<Model>): Promise<Model> => {
    this.log.info('inserting new user %j', data)
    const res = await getManager()
      .createQueryBuilder()
      .insert()
      .into(Model)
      .values(data)
      .returning('*')
      .execute()

    const result = head(res.generatedMaps) as Model

    return result
  }
}
