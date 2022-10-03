import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const errorHandler = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
  reply
    .type('application/json')
    .code(400)
    .send({ error })
}
