import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { HealthRoute } from './health'
import { StatsRoute } from './stats'
import { MeRoute } from './me'
import registerApiRoutes from './apiRoutes'
import { AuthController } from '../../services/oauth2/auth'

export default async (fastify: FastifyInstance, authControlller: AuthController) => {
  fastify.setErrorHandler(errorHandler)

  fastify.get('/', async (req, res) => `👋 Hello ${req?.user?.name || 'Странник'} 👋`)

  HealthRoute(fastify)

  fastify.route({
    method: 'GET',
    url: '/auth/local',
    handler: () => authControlller.authorizeLocal,
  })

  fastify.route({
    method: 'POST',
    url: '/logout',
    handler: () => authControlller.logoutUser,
  })

  StatsRoute(fastify)

  // Authorized routes

  const AUTH_REQUIRED = {
    onRequest: [fastify.authenticate]
  }

  // StatsRoute(fastify, AUTH_REQUIRED)
  MeRoute(fastify, AUTH_REQUIRED)

  registerApiRoutes(fastify, AUTH_REQUIRED)

  fastify.log.info({ routes: fastify.routes }, 'routes registered')
}
