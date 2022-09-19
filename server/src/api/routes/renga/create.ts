import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/renga/create'
import { handler } from '../../handlers/renga/create'
import { wrapHandler } from '../../../utils/wrapHandler'

export async function RengaCreate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga',
    schema,
    handler: wrapHandler(handler)
  })
}
