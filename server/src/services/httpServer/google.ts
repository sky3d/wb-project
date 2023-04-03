import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyInstance } from 'fastify'
import { isEmpty } from 'lodash'
// import got from 'got'

const sget = require('simple-get')
// import { UserProfile } from '../../interfaces'
import { AuthController } from './auth'
import { OAuthCredentials } from '../../types'


export function registerGoogle(parent: AuthController, fastify: FastifyInstance, googleConfig: OAuthCredentials) {
  const { log } = parent

  const options = {
    name: 'googleOAuth2',
    scope: ['profile'],
    credentials: {
      client: {
        id: googleConfig.clientId,
        secret: googleConfig.clientSecret
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION
    },
    startRedirectPath: '/auth/google',
    callbackUri: `${parent.domain}/auth/google/callback`,
  }

  log.debug({ options }, '-->Register google callback')

  fastify.register(fastifyOauth2, options)

  fastify.get('/auth/google/callback', async function (request, reply) {
    log.debug('-->Google callback...')
    // @ts-ignore
    const data = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    log.debug(data, '-->OAuth Google response')

    console.log('DATA====', data)

    const { access_token: token } = data?.token
    console.log('DATA_TOKKK====', token)

    log.debug({ token }, '--> User info fetching...')

    sget.concat({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
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

      Promise.resolve(parent.authorize(reply, userData))
    })

    // TODO refactor!
    // const profile: UserProfile = await got.get(
    //   'https://www.googleapis.com/oauth2/v3/userinfo', {
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
