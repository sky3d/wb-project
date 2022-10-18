import fpass from '@fastify/passport'
import fss from '@fastify/secure-session'
import { FastifyInstance } from 'fastify'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as VKStrategy } from 'passport-vkontakte'
import { User } from '../../models/user'
import { PassportOptions, RenkuAuthConfig } from '../../types'
import { getUser } from '../user'

const passportOptions = (hostUrl: string, config: PassportOptions) => ({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: hostUrl + config.callbackURL
})

const verify = async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  const [err, user] = await getUser().authenticateOnCreate(profile)
  if (err) {
    return done(err)
  }

  if (user) {
    return done(undefined, user)
  }
  return done(undefined, false) // TODO check
}


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
    }
  )

  // OAuth vKontakte

  server.get('/auth/vk', fpass.authenticate('vk', { authInfo: false }))


  server.get('/auth/vk/callback',
    { preValidation: fpass.authenticate('vk', { authInfo: false }) },

    async (req, res) => {
      'AUTH ' + JSON.stringify(req.user)
      res.redirect('/')
    }
  )


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
  }
  )
}
