import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/renga/update'
import { handler } from '../../handlers/renga/update'

export async function RengaUpdate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga/:id',
    schema,
    handler
  })
}
