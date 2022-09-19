import { FastifyInstance } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { StatusRoute } from './health'

import { RengaCreate } from './renga/create'
import { RengaUpdate } from './renga/update'
import { RengaList } from './renga/list'

export const routes = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.register(StatusRoute)

  fastify.register(RengaCreate, { prefix: '/api' })
  fastify.register(RengaUpdate, { prefix: '/api' })
  fastify.register(RengaList, { prefix: '/api' })

  fastify.log.info('routes registered')
}
