import { FastifyInstance } from 'fastify'
import { wrapHandler } from '../../../utils/wrapHandler'
import { schema } from '../../../schemas/variant/create'
import { handler } from '../../handlers/variant/create'

export async function VariantCreate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/variant',
    schema,
    handler: wrapHandler(fastify.app, handler)
  })
}
