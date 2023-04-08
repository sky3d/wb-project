import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyInstance } from 'fastify'
import { Dispatcher } from 'undici'
import { isEmpty, omit } from 'lodash'

import { OAuthCredentials } from '../../types'
import { GOOGLE_PROVIDER } from '../../configs/auth'
import { UserProfileLike, UserRawProfile } from '../../interfaces'

import { AuthController } from './auth'
import { fetchGoogleUser } from '../../utils/httpRequest'

export function registerGoogle(parent: AuthController, fastify: FastifyInstance, cred: OAuthCredentials) {
  const { log } = parent

  log.debug('-->Register google callback')

  fastify.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: ['profile'],
    credentials: {
      client: {
        id: cred.clientId,
        secret: cred.clientSecret
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION
    },
    startRedirectPath: '/auth/google',
    callbackUri: `${parent.domain}/auth/google/callback`,
  })

  fastify.get('/auth/google/callback', async function (request, reply) {
    log.debug('-->Google callback...')
    // @ts-ignore
    const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const accessToken = token.access_token

    log.debug('fetching user by token %s', token)
    const response: Dispatcher.ResponseData = await fetchGoogleUser(accessToken)

    if (response.statusCode >= 400) {
      throw reply.unauthorized('Authenticate again')
    }

    const data: any = await response.body.json()
    log.debug({ data }, '-----GOOGLE_USER_DATA ')

    if (isEmpty(data)) {
      return reply.send('Bad user profile')
    }

    const profile: UserProfileLike = {
      id: data.id,
      name: data.name,
      avatar: data.picture,
      provider: GOOGLE_PROVIDER,
    }
    const raw: UserRawProfile = omit(data, ['_raw', '_json'])

    log.debug({ profile }, '--> User profile received')

    await parent.authorize(reply, { profile, raw })
    reply
      .redirect('http://localhost:4000/')
    log.debug('--> End of google callback')
  })
}
