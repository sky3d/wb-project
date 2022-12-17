import { head, isEmpty, omit } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { Renku } from '../../main'
import { StorageService } from '../storage'
import { User as Model } from '../../models/user'

// const SEPARATOR = '!'

export class User extends StorageService<Model> {
  // vkontakte:746268548
  public static buildSocialId = (provider: string, userId: string) => `${provider}:${userId}`
  public static kName = 'user'


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

  public byProviderId = (providerId: Model['providerId'], provider: Model['provider']) => {
    const qb = getRepository(Model)
      .createQueryBuilder('u')
      .where('u.providerId = :providerId', { providerId })
      .andWhere('u.provider = :provider', { provider })

    return qb.getOne()
  }

  public async authOrStore(profile: any): Promise<[Error | undefined, Model | undefined]> {
    this.log.info({ profile }, '-----> PASSPORT_USER')

    if (isEmpty(profile)) {
      this.log.warn('Bad user profile')
      return [new Error('Bad profile'), undefined]
    }
    const { provider, id: providerId, displayName } = profile

    try {
      const candidate = await this.byProviderId(providerId, provider)
      this.log.info({ provider, providerId }, 'user found')

      if (candidate) {
        return [undefined, candidate]
      }

      this.log.info('registering new user %j', profile)

      const data: Partial<Model> = {
        providerId,
        provider,
        displayName,
        profile: omit(profile, ['_raw', '_json'])
      }
      const user = await this.create(data)

      this.log.info({ user }, 'user created %s', user.id)

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
  public update = async (userId: Model['id'], data: Partial<Model>): Promise<Model | undefined> => {
    await getManager()
      .createQueryBuilder()
      .update(Model)
      .set(data)
      .where({ id: userId })
      .execute()

    return this.byId(userId)
  }
}
