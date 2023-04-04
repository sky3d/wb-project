import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyInstance } from 'fastify'
import { isEmpty } from 'lodash'

const sget = require('simple-get')
import { AuthController } from './auth'
import { OAuthCredentials } from '../../types'


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

    log.debug(token, '-->OAuth Google response')

    sget.concat({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token.access_token
      },
      json: true
    }, function (err: any, res: any, data: any) {

      const profile = data
      log.debug({ profile }, '--> User profile received')

      if (isEmpty(profile)) {
        reply.send('Bad user profile')
      }

      log.debug('--> Authorizing or store user')
      const userData = { ...profile, provider: 'google' }

      return parent.authorize(reply, userData)
    })

    // TODO refactor!
    // const profile: UserProfile = await got.get(
    //   'https://www.googleapis.com/oauth2/v2/userinfo', {
    //   headers: {
    //     Authorization: 'Bearer ' + token
    //   }
    // })

    // log.debug({ profile }, '--> User profile received')

    // if (isEmpty(profile)) {
    //   return new Error('Bad user profile')
    // }

    // log.debug('--> Authorizing or store user')
    // const userData = { ...profile, provider: 'google' }

    // await parent.authorize(reply, userData)

    log.debug('--> End of google callback')
  })
}
