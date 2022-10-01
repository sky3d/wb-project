import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/renga/verses'
import { handler } from '../../handlers/renga/verses'

export async function RengaVerses(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/renga/:id/verses',
    schema,
    handler
  })
}
