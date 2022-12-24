import { FastifyInstance } from 'fastify'

import { schema } from '../../schemas/me'
import { wrapHandler } from '../../utils/wrapHandler'
import { handler } from '../handlers/me'

export async function MeRoute(fastify: FastifyInstance, options: any = {}) {
  fastify.route({
    method: 'GET',
    url: '/me',
    schema,
    handler: wrapHandler(fastify.app, handler),
    ...options,
  })
}
