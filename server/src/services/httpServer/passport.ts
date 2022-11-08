import pass from '@fastify/passport'
import fss from '@fastify/secure-session'
import { FastifyInstance } from 'fastify'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
// import { Strategy as VKStrategy } from 'passport-vkontakte'
import { User } from '../../models/user'
import { PassportOptions, RenkuConfig } from '../../types'
import { getUser } from '../user'
import { generateToken } from './auth'

const passportOptions = (hostUrl: string, config: PassportOptions) => ({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: hostUrl + config.callbackURL,
  //passReqToCallback: true,
})

const verifyCallback = async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  const users = getUser()
  const [err, user] = await users.authenticateOnCreate(profile)
  if (err || user) {
    return done(err, user)
  }

  return done(undefined, false) // TODO check
}

export function registerPassport(fastify: FastifyInstance, config: RenkuConfig, log: any) {
  const { server, auth } = config
  const hostUrl = `http://${server.host}:${server.port}`

  log.info('init passport secure session')
  fastify.register(fss, {
    key: Buffer.from(config.auth.cookieKey as string, 'hex'),
    cookie: {
      path: '/',
      httpOnly: true,
    },
  })

  fastify.register(pass.initialize())
  fastify.register(pass.secureSession())

  const googleOpts = passportOptions(hostUrl, auth.passport.google)
  pass.use('google', new GoogleStrategy(googleOpts, verifyCallback))
  // fpass.use('vk', new VKStrategy(passportOptions(hostUrl, vkontakte), verify))

  pass.registerUserSerializer(async (user: User, req) => {
    return user?.id
  })

  pass.registerUserDeserializer(async (userId: string, req) => {
    const user = await getUser().byId(userId)

    return {
      id: user?.id,
      provider: user?.provider,
      displayName: user?.displayName
    }
  })

  // OAuth Google
  // TODO change to post
  fastify.get('/auth/google', pass.authenticate('google', { scope: ['profile'] }))

  fastify.get('/auth/google/callback',
    { preValidation: pass.authenticate('google', { scope: ['profile'] }) },

    async (req, reply) => {
      const token = generateToken(req, reply)
      console.log('AUTH_GOOGLE_OK', token)

      // const token = server.jwt.sign({ payload })

      //const token = jwt.sign(payload, process.env.JWT_SECRET)
      //var cookiePayload = { user, token }

      // reply.cookie('auth', JSON.stringify(cookiePayload), { domain: process.env.HOST })
      reply.redirect(process.env.CLIENT_HOST + '/login_success') // loginsuccess
    }
  )

  // OAuth vKontakte

  // server.get('/auth/vk', fpass.authenticate('vk', { authInfo: false }))


  // server.get('/auth/vk/callback',
  //   { preValidation: fpass.authenticate('vk', { authInfo: false }) },

  //   async (req, res) => {
  //   }
  // )

  // fastify.get('/logout', async (req, res) => {
  //   req.logout()

  //   // req.session.delete()
  //   res.send({ good: 'bye' })
  // })

  log.info('passport initialization complete!')
}
