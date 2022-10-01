import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { HealthRoute } from './health'
import { StatsRoute } from './stats'

import { RengaCreate } from './renga/create'
import { RengaUpdate } from './renga/update'
import { RengaList } from './renga/list'
import { RengaVerses } from './renga/verses'

import { VerseCreate } from './verse/create'
import { VerseUpdate } from './verse/update'
import { VerseDelete } from './verse/delete'

const API_PREFIX = { prefix: '/api' }

const registerApiRoute = (fastify: FastifyInstance, route: FastifyPluginCallback) =>
  fastify.register(route, API_PREFIX)

export default async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.register(HealthRoute)
  fastify.register(StatsRoute)

  registerApiRoute(fastify, RengaCreate)
  registerApiRoute(fastify, RengaUpdate)
  registerApiRoute(fastify, RengaList)
  registerApiRoute(fastify, RengaVerses)

  registerApiRoute(fastify, VerseCreate)
  registerApiRoute(fastify, VerseUpdate)
  registerApiRoute(fastify, VerseDelete)

  fastify.log.info('routes registered')
}
