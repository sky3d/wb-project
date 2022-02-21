import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const errorHandler = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
  const body = { error: error.message }
  reply.code(400)
  reply.type('application/json')
  reply.send(body)
}
