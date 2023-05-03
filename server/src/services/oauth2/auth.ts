import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { OAuthCredentials, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { BAD_REQUEST, OK, REDIRECT_FOUND } from '../../utils/http'
import { Renku } from '../../main'
import { UserProfile, UserProfileLike } from '../../interfaces'
import { addMinutes } from '../../utils/datetime'

export class AuthController {
  public static authPath = (provider: string) => `/auth/${provider}`

  private config: RenkuConfig

  public readonly domain: string
  public readonly log: Renku['log']

  constructor(config: RenkuConfig, log: any) {
    this.config = config
    this.log = log

    this.domain = `http://${config.server.host}:${config.server.port}`
  }

  public init(fastify: FastifyInstance) {
    const { providers } = this.config.auth
    const list = Object.keys(providers)

    for (const name of list) {
      try {
        const { register } = require(`./${name}`)
        if (register !== null && typeof register === 'function') {
          this.log.info('oauth2 provider added: [%s]', name.toUpperCase())

          register(this, fastify, providers[name])
        } else {
          this.log.warn('no register function for %s provider', name)
        }
      } catch (err) {
        this.log.warn({ err }, `FAIL! register ${name} oauth2 provider`)
      }
    }
  }

  private authUser(userProfile: UserProfile): Promise<any> {
    return getUser().authOrStore(userProfile)
  }

  public async authorize(reply: FastifyReply, userProfile: UserProfile): Promise<boolean> {
    const { auth, server } = this.config

    const userMeta = await this.authUser(userProfile)

    if (!userMeta) {
      reply
        .code(BAD_REQUEST)
        .send('Auth error')
      return false
    }

    const data = userMeta.accessToken

    this.log.debug({ name: auth.cookieKey, data }, 'set cookie')

    const mins = process.env.COOKIE_EXPIRES_MIN ? parseInt(process.env.COOKIE_EXPIRES_MIN, 10) : 5

    reply
      .setCookie(auth.cookieKey, data, {
        domain: server.host,
        signed: true,
        path: '/',
        expires: addMinutes(mins)
      })

    return true
  }

  public async authorizeLocal(request: FastifyRequest, reply: FastifyReply) {
    this.log.debug({ params: request.params, body: request.body }, '--> Register via local provider')

    const profile: UserProfileLike = {
      id: process.env.LOCAL_ADMIN_ID as string,
      name: 'Guest',
      provider: 'local',
    }

    const userMeta = await this.authUser({ profile, raw: {} })

    if (!userMeta) {
      reply
        .code(BAD_REQUEST)
        .send('Auth error')
      return false
    }

    const data = userMeta

    this.log.debug({ data }, 'local user data')

    reply
      .code(OK)
      .send({ data })
  }

  public logoutUser(_: FastifyRequest, reply: FastifyReply) {
    this.log.debug('--> Log out')
    const { auth } = this.config

    reply
      .clearCookie(auth.cookieKey, {
        path: '/',
        // domain: this.config.server.host
      })
  }
}
