export const auth = {
  passport: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callback: '/auth/google/callback',
    },
    vkontakte: {
      clientId: process.env.VK_APP_ID,
      clientSecret: process.env.VK_SECURE_KEY,
      callback: '/auth/vk/callback',
    }
  },
  cookieKey: process.env.COOKIE_KEY,
}
