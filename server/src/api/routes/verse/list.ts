import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/verse/list'
import { handler } from '../../handlers/verse/list'

export async function VerseList(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/renga/:id/verses',
    schema,
    handler
  })
}
