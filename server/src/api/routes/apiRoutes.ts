import { FastifyInstance, FastifyPluginCallback } from 'fastify'

import { RengaCreate } from './renga/create'
import { RengaUpdate } from './renga/update'
import { RengaList } from './renga/list'
import { RengaVerses } from './renga/verses'

import { VerseCreate } from './verse/create'
import { VerseUpdate } from './verse/update'
import { VerseDelete } from './verse/delete'

import { VariantCreate } from './variant/create'

const API_PREFIX = { prefix: '/api' }

export default async (fastify: FastifyInstance) => {

  fastify.register(function (app, _, done) {
    RengaCreate(app)
    RengaUpdate(app)
    RengaList(app)
    RengaVerses(app)
    VerseCreate(app)
    VerseUpdate(app)
    VerseDelete(app)
    VariantCreate(app)

    done()
  }, API_PREFIX) // global route prefix


}
