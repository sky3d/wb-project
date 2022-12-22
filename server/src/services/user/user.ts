import { head, isEmpty, omit } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { Renku } from '../../main'
import { StorageService } from '../storage'
import { User as Model } from '../../models/user'
import { TokenService } from './token'
import { assert } from 'console'
import { UserMeta, UserProfile } from '../../interfaces'

const mapUser = (user: Model) => ({
  id: user.id,
  name: user.name,
  avatar: user.avatar,
})
export class User extends StorageService<Model> {
  // vkontakte:746268548
  public static buildSocialId = (provider: string, userId: string) => `${provider}:${userId}`
  public static kName = 'user'


  public readonly config: any
  public readonly log: any
  private tokens: TokenService

  constructor(parent: Renku) {
    super()

    this.log = parent.log.child({ module: '@user' })
    //@ts-ignore
    this.config = parent.config

    this.tokens = new TokenService(parent.config.auth)

    this.log.info('user service created')
  }

  async connect() {
    // await super.connect()
  }

  async close() {
    // await super.close()
  }

  public byId = (id: Model['id']) => Model.findOne<Model>(id)

  public byProviderId = (providerId: Model['providerId']) => {
    const qb = getRepository(Model)
      .createQueryBuilder('u')
      .where('u.providerId = :providerId', { providerId })

    return qb.getOne()
  }

  private async ensureUserCreated(profile: any): Promise<Model> {
    const { provider, id, name, picture } = profile || {}

    const providerId = User.buildSocialId(provider, id)

    const user = await this.byProviderId(providerId)

    if (user) {
      this.log.info({ userId: user.id }, 'existing user found')
      return user
    }

    this.log.info('registering new user %j', profile)

    const data: Partial<Model> = {
      name,
      avatar: picture,
      providerId,
      profile: omit(profile, ['_raw', '_json'])
    }

    const created = await this.create(data)
    return created
  }

  public getMeta(accessToken: string): UserMeta {
    const res = this.tokens.verifyToken(accessToken)
    return res as UserMeta
  }

  public async authOrStore(profile: UserProfile): Promise<UserMeta> {
    this.log.info({ profile }, 'PROFILE')

    const user = await this.ensureUserCreated(profile)
    assert(user)

    const userDto = mapUser(user)
    const tokens = this.tokens.generateTokens({ ...userDto })

    await this.tokens.saveToken(user.id, tokens.refreshToken)

    return {
      user: userDto,
      ...tokens,
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
