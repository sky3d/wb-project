import path from 'node:path'
import fpass from '@fastify/passport'
import fss from '@fastify/secure-session'
import { FastifyInstance } from 'fastify'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as VKStrategy } from 'passport-vkontakte'
import { PassportOptions, RenkuAuthConfig } from '../../types'

const VK_NAME = 'vkontakte'

const passportOptions = (hostUrl: string) => (config: PassportOptions) => ({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: hostUrl + config.callback
})


export function initAuth(server: FastifyInstance, config: RenkuAuthConfig, hostUrl: string) {
  server.register(fss, {
    key: Buffer.from(process.env.COOKIE_KEY as string, 'hex'),
    cookie: {
      path: '/'
    }
  })

  server.register(fpass.initialize())
  server.register(fpass.secureSession())


  const verify = (accessToken: string, refreshToken: string, profile: any, done: any) => {
    console.log('VK_accesstoken' + JSON.stringify(accessToken))
    console.log('refreshToken' + JSON.stringify(refreshToken))
    //console.log('VK_params' + JSON.stringify(params))
    console.log('VK_profile' + JSON.stringify(profile))

    done(undefined, profile)
  }

  let provider: 'google' | 'vk'

  // provider = 'google'
  provider = 'vk'


  const { google, vkontakte } = config.passport || {}

  const buildOptions = passportOptions(hostUrl)

  fpass.use('google', new GoogleStrategy(buildOptions(google), verify))
  fpass.use('vk', new VKStrategy(buildOptions(vkontakte), verify))

  fpass.registerUserDeserializer(async (user, req) => {
    return user
  })

  fpass.registerUserSerializer(async (user, req) => {
    return user
  })

  server.get('/',
    async (req, res) => {
      // @ts-ignore
      return `👋 Hello ${req?.user?.displayName || 'Странник'} 👋`
    }
  )

  server.post('/auth/google', fpass.authenticate('google', { scope: ['profile'] }))
  server.post('/auth/vk', fpass.authenticate('vk', { authInfo: false }))

  server.get('/auth/google/callback',
    { preValidation: fpass.authenticate('google', { scope: ['profile'] }) },

    async (req, res) => {
      res.redirect('/')
    }
  )

  server.get('/auth/vk/callback',
    { preValidation: fpass.authenticate('vk', { authInfo: false }) },

    async (req, res) => {
      'AUTH ' + JSON.stringify(req.user)
      res.redirect('/')
    }
  )

  server.get('/login', async () => {

  })

  server.get('/logout',
    async (req, res) => {
      req.logout()
      return { success: true }
    }
  )
}
