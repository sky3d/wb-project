export const GOOGLE_PROVIDER = 'google'
export const GITHUB_PROVIDER = 'github'
export const VKONTAKTE_PROVIDER = 'vkontakte'

export const auth = {
  providers: {
    [GOOGLE_PROVIDER]: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `/auth/${GOOGLE_PROVIDER}/callback`,
    },
    [GITHUB_PROVIDER]: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `/auth/${GITHUB_PROVIDER}/callback`,
    },
    [VKONTAKTE_PROVIDER]: {
      clientId: process.env.VK_APP_ID as string,
      clientSecret: process.env.VK_SECURE_KEY as string,
      callbackURL: `/auth/${VKONTAKTE_PROVIDER}/callback`,
    }
  },
  cookieKey: process.env.COOKIE_KEY || 'wb-renga-jwt',
  cookieSecret: process.env.COOKIE_SECRET || 'my-secret-for-cookie',
  jwtSecret: process.env.JWT_ACCESS_SECRET || 'my-very-long-strong-super-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change-my-very-long-strong-super-secret',
}
