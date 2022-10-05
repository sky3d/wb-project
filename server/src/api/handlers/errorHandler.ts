import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { BAD_REQUEST } from '../../utils/http'

export const errorHandler = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
  reply
    .type('application/json')
    .code(BAD_REQUEST)
    .send({ error })
}
