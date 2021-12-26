import { FastifyInstance } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import StatusRoute = require('./health')
import RengaCreate = require('./renga')

export const routes = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.register(StatusRoute)

  fastify.register(RengaCreate, { prefix: '/api' })
}
