import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { BAD_REQUEST } from '../../utils/http'

export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  console.log('HANLDE_ERR: ', error)

  request.server.log.error({ error }, 'error handled')

  reply
    .type('application/json')
    .code(BAD_REQUEST)
    .send({ error })
}
