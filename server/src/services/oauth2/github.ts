import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyInstance, FastifyRequest } from 'fastify'
const sget = require('simple-get')

import { AuthController } from './auth'
import { OAuthCredentials } from '../../types'
import { GITHUB_PROVIDER } from '../../configs/auth'
import { UserProfile, UserProfileLike } from '../../interfaces'
import { isEmpty } from 'lodash'

// TODO re-write using got or undici
const fetchUser = async (token: string, log: any): Promise<any> => {
  log.debug('fetching user by token %s', token)

  return new Promise((resolve, reject) => {
    if (!token) {
      reject('bad token')
    }

    const clientId = process.env.GITHUB_CLIENT_ID as string
    const authData = `${clientId}:${process.env.GITHUB_CLIENT_SECRET}`
    const authHeader = 'Basic ' + Buffer.from(authData).toString('base64')

    sget.concat({
      url: `https://api.github.com/applications/${clientId}/token`,
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'wb-project',
      },
      body: { access_token: token },
      json: true
    }, function (err: any, res: any, data: any) {
      if (err) {
        log.error(err)
        reject(err)
      }
      resolve(data)
    })
  })
}

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

    log.debug('access_token %s', accessToken)

    // Check access token: https://docs.github.com/en/rest/apps/oauth-applications#check-a-token
    const data = await fetchUser(accessToken, log)

    if (isEmpty(data?.user)) {
      return reply.send('Bad user profile')
    }

    const profile: UserProfileLike = {
      id: data.user.id,
      name: data.user.login,
      avatar: data.user.avatar_url,
      provider: GITHUB_PROVIDER,
    }

    log.debug({ profile }, '--> User profile received')

    await parent.authorize(reply, profile)

    log.debug('--> End of github callback')
    // @ts-ignore
    // TEST reply.send({ accessToken, user: userData?.user })
  })
}
