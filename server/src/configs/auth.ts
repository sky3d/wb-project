export const GOOGLE_PROVIDER = 'google'
export const VKONTAKTE_PROVIDER = 'vkontakte'

export const auth = {
  passport: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || '0',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '0',
      callbackURL: `/auth/${GOOGLE_PROVIDER}/callback`,
    },
    vkontakte: {
      clientID: process.env.VK_APP_ID || '0',
      clientSecret: process.env.VK_SECURE_KEY || '0',
      callbackURL: `/auth/${VKONTAKTE_PROVIDER}/callback`,
    }
  },
  cookieKey: process.env.COOKIE_KEY,
  jwtSecret: 'very-long-super-mega-secret',
}
