import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { HealthRoute } from './health'
import { StatsRoute } from './stats'
import { MeRoute } from './me'
import registerApiRoutes from './apiRoutes'

export default async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.get('/', async (req, res) => {
    // @ts-ignore
    return `👋 Hello ${req?.user?.name || 'Странник'} 👋`
  })

  HealthRoute(fastify)
  StatsRoute(fastify)
  MeRoute(fastify)

  // TODO authenticate
  registerApiRoutes(fastify)

  fastify.log.info('routes registered')
}
