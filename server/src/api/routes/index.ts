import { FastifyInstance } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { StatusRoute } from './health'
import { RengaCreate, RengaList } from './renga'

export const routes = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.register(StatusRoute)

  fastify.register(RengaCreate, { prefix: '/api' })
  fastify.register(RengaList, { prefix: '/api' })

  fastify.log.info('routes registered')
}
