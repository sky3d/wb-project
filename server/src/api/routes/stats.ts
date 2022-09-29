import { FastifyInstance } from 'fastify'

import { schema } from '../../schemas/stats'
import { handler } from '../handlers/stats'


export async function StatsRoute(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/stats',
    schema,
    handler,
  })
}
