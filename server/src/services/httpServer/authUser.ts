import { FastifyReply, FastifyRequest } from 'fastify'

function extractToken(request: FastifyRequest) {
  const { authorization } = request?.headers

  if (authorization) {
    const parts = authorization.split(' ')

    let token
    if (parts.length === 2) {
      const scheme = parts[0]
      token = parts[1]

      if (!/^Bearer$/i.test(scheme)) {
        throw new Error('Not auth')
      }

      return token
    }
  }
  return null
}

export function authorizeUser(request: FastifyRequest, reply: FastifyReply, done: any) {
  const token = extractToken(request)
  const { app, log } = request.server

  const meta = app.user.getMeta(token)
  if (!meta) {
    return reply.forbidden()
  }

  log.debug({ user: meta.name }, 'auth success')
  request.user = meta
  request.tokens = { accessToken: token }

  done()
}
