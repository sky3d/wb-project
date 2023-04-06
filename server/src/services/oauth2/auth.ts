import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { RenkuAuthConfig, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { BAD_REQUEST } from '../../utils/http'
import { Renku } from '../../main'
import { GITHUB_PROVIDER, GOOGLE_PROVIDER } from '../../configs/auth'

import { registerGoogle } from './google'
import { registerGithub } from './github'
import { hostName, setReplyCookie } from '../../utils/cookie'
import { UserProfile } from '../../interfaces'

export class AuthController {
  public static authPath = (provider: string) => `/auth/${provider}`

  private authConfig: RenkuAuthConfig

  public readonly domain: string
  public readonly log: Renku['log']

  constructor(config: RenkuConfig, log: any) {
    this.authConfig = config.auth
    this.log = log
    this.domain = `http://${config.server.host}:${config.server.port}`
  }

  public register(fastify: FastifyInstance) {
    const { providers } = this.authConfig

    // register providers
    registerGoogle(this, fastify, providers[GOOGLE_PROVIDER])
    registerGithub(this, fastify, providers[GITHUB_PROVIDER])

    fastify.route({
      method: 'GET',
      url: '/logout',
      handler: () => this.logoutUser,
    })
  }

  public async authorize(reply: FastifyReply, userProfile: UserProfile) {
    const userMeta = await getUser().authOrStore(userProfile)

    if (!userMeta) {
      reply
        .code(BAD_REQUEST)
        .send('Auth error')
      return false
    }

    const data = userMeta.accessToken
    const options = { domain: hostName(this.domain) }

    this.log.debug({ name: this.authConfig.cookieKey, data }, 'set cookie')

    return setReplyCookie(reply, this.authConfig.cookieKey, data, options, process.env.CLIENT_HOST)
  }

  private logoutUser(_: FastifyRequest, reply: FastifyReply) {
    this.log.debug('--> Log out')

    const name = this.authConfig.cookieKey
    const options = { domain: hostName(this.domain) }

    return setReplyCookie(reply, name, '', options, '/health')
  }
}
