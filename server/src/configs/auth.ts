export const GOOGLE_PROVIDER = 'google'
export const VKONTAKTE_PROVIDER = 'vkontakte'

export const auth = {
  providers: {
    [GOOGLE_PROVIDER]: {
      clientId: process.env.GOOGLE_CLIENT_ID || '0',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '0',
      callbackURL: `/auth/${GOOGLE_PROVIDER}/callback`,
    },
    [VKONTAKTE_PROVIDER]: {
      clientId: process.env.VK_APP_ID || '0',
      clientSecret: process.env.VK_SECURE_KEY || '0',
      callbackURL: `/auth/${VKONTAKTE_PROVIDER}/callback`,
    }
  },
  cookieKey: process.env.COOKIE_KEY,
  jwtSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}
