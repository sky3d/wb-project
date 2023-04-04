import { CookieSerializeOptions } from '@fastify/cookie'
import { FastifyInstance, FastifyReply } from 'fastify'

import { RenkuAuthConfig, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { UserProfile } from '../../interfaces'
import { BAD_REQUEST } from '../../utils/http'
import { isEmpty } from 'lodash'
import { Renku } from '../../main'
import { registerGoogle } from './google'
import { GOOGLE_PROVIDER } from '../../configs/auth'

const cookieExpireTime = (delta: number) => {
  const dt = new Date()
  const mins = dt.getMinutes()
  dt.setMinutes(mins + delta)
  return dt
}

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

  private setCookie = async (reply: FastifyReply, data: string = '') => {
    const { hostname } = new URL(this.domain)

    const cookieOptions: CookieSerializeOptions = {
      domain: hostname,
      path: '/',
      signed: true,
      httpOnly: true,  // allow to read from client
      expires: cookieExpireTime(data.length ? 60 * 24 : -1),
      // allow cross-site-origin
      sameSite: 'none',
      secure: true
    }

    this.log.debug({ ...cookieOptions, data }, 'set cookie %s', this.authConfig.cookieKey)

    reply
      .setCookie(this.authConfig.cookieKey, data, cookieOptions)
      .code(302)
      .redirect(process.env.CLIENT_HOST || '/')
  }

  public register(fastify: FastifyInstance) {
    const { providers } = this.authConfig
    const self = this

    // register providers
    registerGoogle(this, fastify, providers[GOOGLE_PROVIDER])

    fastify.get('/logout', async function (_, reply) {
      this.log.debug('--> Log out')
      await self.setCookie(reply, undefined)
    })
  }

  public async authorize(reply: FastifyReply, profile: any) {
    const userMeta = await getUser().authOrStore(profile)

    if (!userMeta) {
      reply
        .code(BAD_REQUEST)
        .send('Auth error')
      return
    }

    this.log.debug('Setup cookie')

    await this.setCookie(reply, userMeta.accessToken)
  }
}
