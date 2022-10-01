import { FastifyInstance } from 'fastify'
import { wrapHandler } from '../../../utils/wrapHandler'
import { schema } from '../../../schemas/verse/create'
import { handler } from '../../handlers/verse/create'

export async function VerseCreate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/verse',
    schema,
    handler: wrapHandler(fastify.app, handler)
  })
}
