import { CookieSerializeOptions } from '@fastify/cookie'
import { FastifyReply } from 'fastify'

const setExpiration = (delta: number) => {
  const dt = new Date()
  const mins = dt.getMinutes()
  dt.setMinutes(mins + delta)
  return dt
}

export const hostName = (domain: string) => new URL(domain).hostname

export const setReplyCookie = (
  reply: FastifyReply,
  name: string,
  data: string,
  options: Partial<CookieSerializeOptions>,
  redirectUrl?: string
) => {
  const cookieOptions: CookieSerializeOptions = {
    path: '/',
    signed: true,
    // httpOnly: true, // Allow reading from client
    expires: setExpiration(data.length ? 60 * 24 : -1),
    // allow cross-site-origin
    // sameSite: 'none',
    // secure: true,
    ...options,
  }

  reply
    .setCookie(name, data, cookieOptions)

  if (redirectUrl) {
    reply
      .code(200)
      // .redirect(redirectUrl)
  }
}
