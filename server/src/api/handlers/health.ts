import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const handler = (_: FastifyRequest, reply: FastifyReply) => {
  reply
    .type('application/json')
    .code(200)
    .send({ status: 'OK' })
}
