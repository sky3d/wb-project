import { FastifyInstance } from 'fastify'
import { wrapHandler } from '../../../utils/wrapHandler'
import { schema } from '../../../schemas/verse/update'
import { handler } from '../../handlers/verse/update'

export async function VerseUpdate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/verse/:id',
    schema,
    handler: wrapHandler(fastify.app, handler)
  })
}
