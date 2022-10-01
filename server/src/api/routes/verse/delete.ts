import { FastifyInstance } from 'fastify'
import { wrapHandler } from '../../../utils/wrapHandler'
import { schema } from '../../../schemas/verse/delete'
import { handler } from '../../handlers/verse/delete'

export async function VerseDelete(fastify: FastifyInstance) {
  fastify.route({
    method: 'DELETE',
    url: '/verse/:id',
    schema,
    handler: wrapHandler(fastify.app, handler)
  })
}
