import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/renga/update'
import { handler } from '../../handlers/renga/update'
import { wrapHandler } from '../../../utils/wrapHandler'

export async function RengaUpdate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga/:id',
    schema,
    handler: wrapHandler(handler)
  })
}
