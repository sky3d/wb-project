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
        throw new Error('Not authorized user')
      }

      return token
    }
  }
  return null
}

export function authorizeUser(request: FastifyRequest, reply: FastifyReply, done: any) {
  const token = extractToken(request)
  const { app, log } = request.server

  const user = app.user.decodeUser(token)
  if (!user) {
    return reply.forbidden()
  }

  log.debug({ user }, 'auth success')
  request.user = user
  // TODO move to user or remove
  request.tokens = { accessToken: token }

  done()
}
