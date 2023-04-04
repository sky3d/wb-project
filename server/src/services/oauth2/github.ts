import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyInstance } from 'fastify'

import { AuthController } from './auth'
import { OAuthCredentials } from '../../types'

export function registerGithub(parent: AuthController, fastify: FastifyInstance, cred: OAuthCredentials) {
  const { log } = parent

  log.debug('-->Register github callback')
  fastify.register(fastifyOauth2, {
    name: 'githubOAuth2',
    scope: [],
    credentials: {
      client: {
        id: cred.clientId,
        secret: cred.clientSecret
      },
      auth: fastifyOauth2.GITHUB_CONFIGURATION
    },
    startRedirectPath: '/auth/github',
    callbackUri: `${parent.domain}/auth/github/callback`,
  })

  fastify.get('/auth/github/callback', async function (request, reply) {
    log.debug('-->Github callback...')
    // @ts-ignore
    const token = await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    log.debug('access_token', token.access_token)

    log.debug('--> End of github callback')
    reply.send({ access_token: token.access_token })
  })
}
