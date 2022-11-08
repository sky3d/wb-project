import { FastifyInstance } from 'fastify'

import { schema } from '../../schemas/me'
import { handler } from '../handlers/me'

export async function MeRoute(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/me',
    schema,
    handler
  })
}
