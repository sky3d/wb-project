import { FastifyInstance } from 'fastify'
import { wrapHandler } from '../../../utils/wrapHandler'
import { schema } from '../../../schemas/renga/update'
import { handler } from '../../handlers/renga/update'

export async function RengaUpdate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga/:id',
    schema,
    handler: wrapHandler(fastify.app, handler)
  })
}
