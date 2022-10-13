import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import favicon from 'fastify-favicon'
import formbody from '@fastify/formbody'
import routesPlugin from '@fastify/routes'
import sensible from '@fastify/sensible'
import helmet from '@fastify/helmet'

import { Renku } from '../../main'
import apiRoutes from '../../api/routes'
import { RENKU_APP_KEY } from '../../constants'
import { initAuth } from './auth'
import { RenkuServerConfig } from '../../types'

export class HttpServer {
  public static kName = 'http-server'

  public readonly log: Renku['log']
  private server: FastifyInstance
  private config: RenkuServerConfig
  private parent: Renku

  constructor(parent: Renku) {
    //@ts-ignore
    this.config = parent.config.server

    this.log = parent.log
    this.parent = parent
  }

  connect = async () => {
    this.server = Fastify({ logger: this.log })
    this.server.log.info('=> starting server at %s', new Date().toString())

    this.initialize(this.server)

    const { port, host } = this.config
    const address = await this.server.listen({ port, host })

    //this.log.debug('server is now listening on [%s]', address)
  }

  close = async () => {
    await this.server.close()
  }

  private async initialize(server: FastifyInstance) {
    // Inject app to have all services in handlers
    server.decorate(RENKU_APP_KEY, this.parent)

    server.register(cors)
    server.register(favicon)
    server.register(formbody)
    server.register(sensible)

    const hostUrl = `${this.config.host}:${this.config.port}`

    initAuth(server, this.parent.config.auth, hostUrl)

    if (process.env.DEBUG) {
      server.addHook('preValidation', function (request, _, done) {
        const { params, query, body } = request
        request.log.info({ params, query, body }, `!REQ ${request.method} ${request.url}`)
        done()
      })
      server.addHook('onError', (request, reply, error, done) => {
        request.log.info({ error }, `!ERROR on ${request.method} ${request.url}`)
        done()
      })
    }

    server.register(helmet, { contentSecurityPolicy: false })
    server.register(routesPlugin)

    server.register(apiRoutes)
  }
}

