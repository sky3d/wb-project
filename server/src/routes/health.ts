import { FastifyInstance } from 'fastify'

async function StatusRoute(fastify: FastifyInstance) {
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
    handler: (_, reply) => reply.send({ status: 'ok' }),
  })
}

export = StatusRoute
