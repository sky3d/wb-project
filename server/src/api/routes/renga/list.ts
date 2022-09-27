import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/renga/list'
import { handler } from '../../handlers/renga/list'

export async function RengaList(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/renga/list',
    schema,
    handler
  })
}
