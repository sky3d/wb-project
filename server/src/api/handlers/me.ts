import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../module'
import { OK, UNAUTHORIZED } from '../../utils/http'

export const handler = async (app: RenkuApp, req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return reply
      .code(UNAUTHORIZED)
      .send({ error: 'No authorization header' })
  }

  const [, accessToken] = authHeader.split(' ')

  if (!accessToken) {
    return reply
      .code(UNAUTHORIZED)
      .send({ error: 'No access token given' })
  }

  const user = app.user.getMeta(accessToken)

  reply
    // .type('application/json')
    .code(OK)
    .send(user)
}
