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
        // httpOnly: true,  // allow to read from client
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

<<<<<<< HEAD

=======
export function passportAuth(server: FastifyInstance, log: any, config: RenkuAuthConfig, hostUrl: string) {
  const session = {
    key: Buffer.from(config.cookieKey as string, 'hex'),
    cookie: {
      path: '/',
      httpOnly: true,
    }
  }
  server.register(fss, session)

  log.info('INIT secure session %j', session)

  server.register(fpass.initialize())
  server.register(fpass.secureSession())

  log.info('secure session initialized')

  const { google, vkontakte } = config.passport

  const options = passportOptions(hostUrl, google)
  log.info('INIT google callback %j', options)

  fpass.use('google', new GoogleStrategy(options, verify))
  // fpass.use('vk', new VKStrategy(passportOptions(hostUrl, vkontakte), verify))

  fpass.registerUserSerializer(async (user: User, req) => {
    log.info('serializer CALLED %j', user)
    return user?.id
  })

  fpass.registerUserDeserializer(async (userId: string, req) => {
    log.info('DEserializer CALLED %j', userId)

    const user = await getUser().byId(userId)
    log.info('user=  %j', user)

    return {
      id: user?.id,
      provider: user?.provider,
      displayName: user?.displayName
    }
  })

  // OAuth Google
  server.get('/auth/google', fpass.authenticate('google', { scope: ['profile'] }))

  server.get('/auth/google/callback',
    { preValidation: fpass.authenticate('google', { scope: ['profile'] }) },

    async (req, res) => {
      log.info('/auth/google/callback CALLED')

      res.redirect('/')
    })

  // OAuth vKontakte

  server.get('/auth/vk', fpass.authenticate('vk', { authInfo: false }))

  server.get('/auth/vk/callback',
    { preValidation: fpass.authenticate('vk', { authInfo: false }) },

    async (req, res) => {
      `AUTH ${JSON.stringify(req.user)}`
      res.redirect('/')
    })

  // server.post('/login', async (req, res) => {
  //   if (req.user) {
  //     res.send(req.user)
  //     return
  //   }

  //   res.redirect('/')
  // })

  server.get('/logout', async (req, res) => {
    req.logout()

    req.session.delete()
    return res.send({ good: 'bye' })
  })
}
>>>>>>> 0ee5f05 (fix: misc changes)
