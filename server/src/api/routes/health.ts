import { FastifyInstance } from 'fastify'

export async function StatusRoute(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/health',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
          },
        },
      },
    },
    handler: (_, reply) => { reply.send({ status: 'ok' }) },
  })
}
