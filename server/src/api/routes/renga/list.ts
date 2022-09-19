import { FastifyInstance } from 'fastify'

import { schema } from '../../../schemas/renga/list'
import { handler } from '../../handlers/renga/list'
import { wrapHandler } from '../../../utils/wrapHandler'

export async function RengaList(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/renga/list',
    schema,
    handler: wrapHandler(handler)
  })
}
