import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { HealthRoute } from './health'
import { StatsRoute } from './stats'

import { RengaCreate } from './renga/create'
import { RengaUpdate } from './renga/update'
import { RengaList } from './renga/list'

import { VerseCreate } from './verse/create'
import { VerseUpdate } from './verse/update'
import { VerseList } from './verse/list'
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

  registerApiRoute(fastify, VerseCreate)
  registerApiRoute(fastify, VerseUpdate)
  registerApiRoute(fastify, VerseList)
  registerApiRoute(fastify, VerseDelete)

  fastify.log.info('routes registered')
}
