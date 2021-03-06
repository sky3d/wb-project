import { FastifyInstance } from 'fastify'

import { schema } from '../../schemas/renga.create'
import { createHandler } from '../handlers/rengaCreate'
import { listHandler } from '../handlers/rengaList'
import { wrapHandler } from '../../utils/wrapHandler'

async function RengaCreate(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/renga',
    schema,
    handler: wrapHandler(createHandler),
  })
}

async function RengaList(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/renga/list',
    schema,
    handler: wrapHandler(listHandler),
  })
}

export {
  RengaCreate,
  RengaList,
}
