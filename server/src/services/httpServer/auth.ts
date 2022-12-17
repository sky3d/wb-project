import got from 'got'
import { fastifyOauth2 } from '@fastify/oauth2'

import { FastifyInstance } from 'fastify'
import { TokenService } from './token'
import { RenkuAuthConfig, RenkuConfig } from '../../types'

export class AuthController {
  private tokens: TokenService
  private authConfig: RenkuAuthConfig
  private host: string

  constructor(tokens: TokenService, config: RenkuConfig) {
    this.tokens = tokens
    this.authConfig = config.auth

    const { host, port } = config.server
    this.host = `http://${host}:${port}`
  }

  public register(fastify: FastifyInstance) {
    const { providers: { google } } = this.authConfig

    const pluginOptions = {
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
      callbackUri: `${this.host}${google.callbackURL}`
    }

    fastify.register(fastifyOauth2, pluginOptions)

    fastify.get('/auth/google/callback', async function (request, reply) {
      const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
      const profile = await got.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: 'Bearer ' + token.access_token
        }
      }).json()

      reply.send(profile)
    })
  }
}


