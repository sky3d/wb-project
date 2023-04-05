import { CookieSerializeOptions } from '@fastify/cookie'
import { FastifyInstance, FastifyReply } from 'fastify'

import { RenkuAuthConfig, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { BAD_REQUEST } from '../../utils/http'
import { Renku } from '../../main'
import { GITHUB_PROVIDER, GOOGLE_PROVIDER } from '../../configs/auth'

import { registerGoogle } from './google'
import { registerGithub } from './github'
import { hostName, setReplyCookie } from '../../utils/cookie'

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
    const self = this

    // register providers
    registerGoogle(this, fastify, providers[GOOGLE_PROVIDER])
    registerGithub(this, fastify, providers[GITHUB_PROVIDER])

    fastify.get('/logout', async function (_, reply) {
      this.log.debug('--> Log out')

      const name = self.authConfig.cookieKey
      const options = { domain: hostName(self.domain) }

      await setReplyCookie(reply, name, '', options)
    })
  }

  public async authorize(reply: FastifyReply, profile: any) {
    const userMeta = await getUser().authOrStore(profile)

    if (!userMeta) {
      reply
        .code(BAD_REQUEST)
        .send('Auth error')
      return Promise.reject()
    }

    const data = userMeta.accessToken
    const options = { domain: hostName(this.domain) }

    this.log.debug({ name: this.authConfig.cookieKey, data }, 'set cookie')

    await setReplyCookie(reply, this.authConfig.cookieKey, data, options, process.env.CLIENT_HOST)
  }
}
