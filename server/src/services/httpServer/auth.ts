import got from 'got'
import { fastifyOauth2 } from '@fastify/oauth2'

import { FastifyInstance } from 'fastify'
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'

import { RenkuAuthConfig, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { UserProfile } from '../../interfaces'
import { BAD_REQUEST } from '../../utils/http'
import { throws } from 'assert'
import { runInThisContext } from 'vm'
import { isEmpty } from 'lodash'

export class AuthController {
  private authConfig: RenkuAuthConfig
  private domain: string

  constructor(config: RenkuConfig) {
    this.authConfig = config.auth
    this.domain = `http://${config.server.host}:${config.server.port}`
  }

  public register(fastify: FastifyInstance) {
    const { providers: { google }, cookieKey } = this.authConfig
    const hostname = new URL(this.domain).hostname

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

    fastify.register(cookie, {
      secret: "my-secret-for-cookie", // for cookies signature
      hook: 'onRequest',
      parseOptions: {}     // options for parsing cookies
    } as FastifyCookieOptions)

    fastify.get('/auth/google/callback', async function (request, reply) {
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

      reply
        .setCookie(cookieKey, userMeta.accessToken, {
          domain: hostname,
          path: '/',
          signed: true,
          httpOnly: true
        })
        //.send(userMeta)
        .code(302)
        .redirect(process.env.CLIENT_HOST || '/')
    })
  }
}


