import { FastifyInstance } from 'fastify'

import { schema } from '../schemas/renga.create'
import { handler as createHandler } from '../handlers/rengaCreate'

async function RengaCreate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga',
    schema,
    handler: createHandler,
  })
}

export = RengaCreate
