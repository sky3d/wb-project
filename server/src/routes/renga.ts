import { FastifyInstance } from 'fastify'

import { schema } from '../schemas/renga.create'
import { createHandler } from '../handlers/rengaCreate'
import { wrapHandler } from '../utils/wrapHandler'

async function RengaCreate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga',
    schema,
    handler: wrapHandler(createHandler),
  })
}

export = RengaCreate
