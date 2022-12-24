import { FastifyInstance } from 'fastify'

import { wrapHandler } from '../../utils/wrapHandler'
import { schema } from '../../schemas/stats'
import { handler } from '../handlers/stats'

export async function StatsRoute(fastify: FastifyInstance, options: any = {}) {
  fastify.route({
    method: 'GET',
    url: '/stats',
    schema,
    handler: wrapHandler(fastify.app, handler),
    ...options
  })
}
