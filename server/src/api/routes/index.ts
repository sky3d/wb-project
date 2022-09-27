import { FastifyInstance } from 'fastify'
import { errorHandler } from '../handlers/errorHandler'
import { StatusRoute } from './health'

import { RengaCreate } from './renga/create'
import { RengaUpdate } from './renga/update'
import { RengaList } from './renga/list'

import { VerseCreate } from './verse/create'
import { VerseUpdate } from './verse/update'
import { VerseList } from './verse/list'

export default async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)

  fastify.register(StatusRoute)

  fastify.register(RengaCreate, { prefix: '/api' })
  fastify.register(RengaUpdate, { prefix: '/api' })
  fastify.register(RengaList, { prefix: '/api' })
  // verse
  fastify.register(VerseCreate, { prefix: '/api' })
  fastify.register(VerseUpdate, { prefix: '/api' })
  fastify.register(VerseList, { prefix: '/api' })

  fastify.log.info('routes registered')
}
