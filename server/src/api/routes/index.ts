import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { HealthRoute } from './health'
import { StatsRoute } from './stats'
import { MeRoute } from './me'
import registerApiRoutes from './apiRoutes'
import { AuthController } from '../../services/oauth2/auth'
import { authorizeUser } from '../../services/httpServer/authUser'

export default async (fastify: FastifyInstance, authControlller: AuthController) => {
  fastify.setErrorHandler(errorHandler)

  fastify.get('/', async (req, res) => `👋 Hello ${req?.user?.name || 'Странник'} 👋`)

  HealthRoute(fastify)

  fastify.route({
    method: 'POST',
    url: '/auth/local',
    handler: async (req, reply) => await authControlller.authorizeLocal(req, reply),
  })

  fastify.route({
    method: 'POST',
    url: '/logout',
    handler: async (req, reply) => await authControlller.logoutUser(req, reply),
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
