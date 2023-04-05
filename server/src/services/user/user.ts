import { head, omit } from 'lodash'
import { getManager, getRepository } from 'typeorm'
import { Renku } from '../../main'
import { StorageService } from '../storage'
import { User as Model } from '../../models/user'
import { RengaUser } from '../../models/rengaUser'
import { TokenService } from './token'
import { assert } from 'console'
import { RengaRole, UserMeta, UserProfile, UserProfileLike } from '../../interfaces'

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
    // @ts-ignore
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

  private async ensureUserCreated(profile: UserProfileLike): Promise<Model> {
    const { provider, id, name, avatar } = profile || {}

    const providerId = User.buildSocialId(provider, id)

    const user = await this.byProviderId(providerId)

    if (user) {
      this.log.info({ userId: user.id }, 'existing user found')
      return user
    }

    this.log.info('registering new user %j', profile)

    const data: Partial<Model> = {
      name,
      avatar,
      providerId,
      profile: omit(profile, ['_raw', '_json'])
    }

    const created = await this.create(data)
    return created
  }

  public decodeUser(accessToken: string): UserMeta {
    const res = this.tokens.verifyToken(accessToken)
    return res as UserMeta
  }

  public async authOrStore(profile: UserProfileLike): Promise<any> {
    this.log.info({ profile }, 'USER_PROFILE')

    const user = await this.ensureUserCreated(profile)
    assert(user)

    const userDto = mapUser(user)
    const tokens = this.tokens.generateTokens({ ...userDto })

    await this.tokens.saveToken(user.id, tokens.refreshToken)

    const res = {
      user: userDto,
      ...tokens,
    }

    this.log.info({ res }, 'registration metadata')

    return res
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

  private findUserRole = (rengaId: RengaUser['rengaId'], userId: RengaUser['userId']) => {
    const qb = getRepository(RengaUser)
      .createQueryBuilder('u')
      .where('u.rengaId = :rengaId', { rengaId })
      .andWhere('u.userId = :userId', { userId })

    return qb.getOne()
  }

  public setUserRole = async (userId: string, rengaId: string, role: RengaRole = RengaRole.Member) => {
    const user = await this.findUserRole(userId, rengaId)
    if (!user) {
      const created = RengaUser.create({ userId, rengaId, role })
      return created.save()
    }

    user.role = role
    return user.save()
  }
}
