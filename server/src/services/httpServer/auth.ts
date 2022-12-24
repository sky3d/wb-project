import got from 'got'
import { fastifyOauth2 } from '@fastify/oauth2'

import { FastifyInstance, FastifyReply } from 'fastify'

import { RenkuAuthConfig, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { UserProfile } from '../../interfaces'
import { BAD_REQUEST } from '../../utils/http'
import { isEmpty } from 'lodash'

export class AuthController {
  private authConfig: RenkuAuthConfig
  private domain: string

  constructor(config: RenkuConfig) {
    this.authConfig = config.auth
    this.domain = `http://${config.server.host}:${config.server.port}`
  }

  private async setCookie(reply: FastifyReply, data: string, clear: boolean) {
    const { hostname } = new URL(this.domain)

    const now = new Date()
    const dt = new Date(now)
    const diff = clear ? -15 : 15
    dt.setMinutes(now.getMinutes() + diff)

    reply
      .setCookie(
        this.authConfig.cookieKey,
        data || '', {
        domain: hostname,
        path: '/',
        signed: true,
        httpOnly: true,
        expires: dt
      })
      .code(302)
      .redirect(process.env.CLIENT_HOST || '/')
  }

  public register(fastify: FastifyInstance) {
    const { providers: { google } } = this.authConfig
    const self = this

    fastify.get('/logout', function (_, reply) {
      self.setCookie(reply, '', true)
    })

    // Google

    fastify.register(fastifyOauth2, {
      name: 'googleOAuth2',
      scope: ['profile'],
      credentials: {
        client: {
          id: google.clientId,
          secret: google.clientSecret
        },
        auth: fastifyOauth2.GOOGLE_CONFIGURATION
      },
      startRedirectPath: '/auth/google',
      callbackUri: `${this.domain}${google.callbackURL}`
    })

    fastify.get('/auth/google/callback', async function (request, reply) {
      // @ts-ignore
      const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

      // TODO refactor!
      const profile: UserProfile = await got.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: 'Bearer ' + token.access_token
        }
      }).json()

      if (isEmpty(profile)) {
        return new Error('Bad user profile')
      }

      const userMeta = await getUser().authOrStore({ ...profile, provider: 'google' })

      if (!userMeta) {
        reply
          .code(BAD_REQUEST)
          .send('Auth error')
        return
      }

      await self.setCookie(reply, userMeta.accessToken, false)
    })
  }
}


