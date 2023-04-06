import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyInstance } from 'fastify'
import { Dispatcher } from 'undici'

import { OAuthCredentials } from '../../types'
import { GITHUB_PROVIDER } from '../../configs/auth'
import { UserProfileLike } from '../../interfaces'
import { isEmpty } from 'lodash'
import { fetchGithubUser } from '../../utils/httpRequest'
import { AuthController } from './auth'

export function registerGithub(parent: AuthController, fastify: FastifyInstance, cred: OAuthCredentials) {
  const log = parent.log

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
    const { token } = await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const accessToken = token.access_token

    log.debug('fetching user by token %s', token)
    const response: Dispatcher.ResponseData = await fetchGithubUser(accessToken)

    if (response.statusCode >= 400) {
      throw reply.unauthorized('Authenticate again')
    }

    const data: any = await response.body.json()
    log.debug({ data }, '-----USER_DATA ')

    if (isEmpty(data?.user)) {
      return reply.send('Bad user profile')
    }

    const profile: UserProfileLike = {
      id: data.user.id,
      name: data.user.login,
      avatar: data.user.avatar_url,
      provider: GITHUB_PROVIDER,
    }

    const raw = data.user

    log.debug({ profile }, '--> User profile received')

    await parent.authorize(reply, { profile, raw })

    log.debug('--> End of github callback')
  })
}
