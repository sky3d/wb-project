import { FastifyInstance } from 'fastify'
import { wrapHandler } from '../../../utils/wrapHandler'
import { schema } from '../../../schemas/renga/create'
import { handler } from '../../handlers/renga/create'

export async function RengaCreate(fastify: FastifyInstance, options: any = {}) {
  fastify.route({
    method: 'POST',
    url: '/renga',
    schema,
    handler: wrapHandler(fastify.app, handler),
    ...options
  })
}
