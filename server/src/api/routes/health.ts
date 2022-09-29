import { FastifyInstance } from 'fastify'

import { schema } from '../../schemas/health'
import { handler } from '../handlers/health'

export async function HealthRoute(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/health',
    schema,
    handler
  })
}
