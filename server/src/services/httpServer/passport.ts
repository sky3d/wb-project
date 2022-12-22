// import { FastifyInstance } from 'fastify'
// import pass from '@fastify/passport'
// import fss from '@fastify/secure-session'
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
// // import { Strategy as VKStrategy } from 'passport-vkontakte'
// import { User } from '../../models/user'
// import { PassportOptions, RenkuConfig } from '../../types'
// import { getUser } from '../user'
// import { TokenService } from './token'
// //import jwt from '@fastify/jwt'

// const passportOptions = (hostUrl: string, config: PassportOptions) => ({
//   clientID: config.clientID,
//   clientSecret: config.clientSecret,
//   callbackURL: hostUrl + config.callbackURL,
//   passReqToCallback: true,
// })

// const verifyCallback = async (accessToken: string, refreshToken: string, profile: any, done: any) => {
//   const users = getUser()
//   const [err, user] = await users.authOrStore(profile)
//   if (err || user) {
//     return done(err, user)
//   }

//   return done(undefined, false) // TODO check
// }

// export function registerPassport(fastify: FastifyInstance, tokens: TokenService, config: RenkuConfig, log: any) {
//   const { server, auth } = config
//   const hostUrl = `http://${server.host}:${server.port}`

//   // fastify.register(require('@fastify/jwt'), {
//   //   secret: auth.jwtSecret,

//   // })

//   log.info('init passport secure session')
//   fastify.register(fss, {
//     key: Buffer.from(config.auth.cookieKey as string, 'hex'),
//     cookie: {
//       path: '/',
//       httpOnly: true,
//     },
//   })

//   fastify.register(pass.initialize())
//   // fastify.register(pass.secureSession())

//   const googleOpts = passportOptions(hostUrl, auth.passport.google)

//   // @ts-ignore
//   pass.use('google', new GoogleStrategy(googleOpts, verifyCallback))
//   // fpass.use('vk', new VKStrategy(passportOptions(hostUrl, vkontakte), verify))

//   pass.registerUserSerializer(async (user: User, req) => {
//     return user?.id
//   })

//   pass.registerUserDeserializer(async (userId: string, req) => {
//     const user = await getUser().byId(userId)

//     return {
//       id: user?.id,
//       provider: user?.provider,
//       displayName: user?.displayName
//     }
//   })

//   // OAuth Google
//   // TODO change to post
//   fastify.get('/auth/google', pass.authenticate('google', { scope: ['profile'] }))

//   fastify.get('/auth/google/callback',
//     { preValidation: pass.authenticate('google', { scope: ['profile'] }) },

//     async (req, reply) => {
//       console.log('AUTH_PASSPORT_USER=', JSON.stringify(req.user))

//       const payload = {}
//       const { accessToken } = tokens.generateToken(payload)

//       console.log('AUTH_GOOGLE_OK=', accessToken)

//       // var payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
//       //const token = generateToken(req, reply)

//       var cookiePayload = {
//         user: {
//           id: req.user?.id,
//           // provider: req.user?.provider,
//         },
//         token: accessToken
//       }

//       reply.setCookie('auth', JSON.stringify(cookiePayload), {
//         domain: process.env.DOMAIN_NAME, // same options as before
//         path: '/',
//         signed: true
//       })

//       //reply.cookie('auth', JSON.stringify(cookiePayload), { domain: process.env.DOMAIN_NAME })
//       // res.redirect(process.env.BASE_CLIENT_URL + '/loginsuccess'

//       reply.redirect(process.env.CLIENT_HOST + '/login_success') // loginsuccess
//     }
//   )

//   // OAuth vKontakte

//   // server.get('/auth/vk', fpass.authenticate('vk', { authInfo: false }))


//   // server.get('/auth/vk/callback',
//   //   { preValidation: fpass.authenticate('vk', { authInfo: false }) },

//   //   async (req, res) => {
//   //   }
//   // )

//   fastify.get('/logout', async (req, res) => {
//     req.logout()

//     // req.session.delete()
//     res.send({ good: 'bye' })
//   })

//   log.info('passport initialization complete!')
// }
