import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { HealthRoute } from './health'
import { StatsRoute } from './stats'
import { MeRoute } from './me'
import registerApiRoutes from './apiRoutes'

export default async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.get('/', async (req, res) =>
    // @ts-ignore
    return `👋 Hello ${req?.user?.name || 'Странник'} 👋`
  })

  HealthRoute(fastify)
  // authorized toutes
  const AUTH_REQUIRED = { onRequest: [fastify.authenticate] }

  StatsRoute(fastify, AUTH_REQUIRED)
  MeRoute(fastify, AUTH_REQUIRED)

  registerApiRoutes(fastify, AUTH_REQUIRED)

  fastify.log.info({ routes: fastify.routes }, 'routes registered')
}
