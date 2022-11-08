import { FastifyReply, FastifyRequest } from 'fastify'

export const handler = (req: FastifyRequest, reply: FastifyReply) => {
  reply
    .type('application/json')
    .code(200)
    .send({
      token: 'abc123',
      user: req.user
    })
}
