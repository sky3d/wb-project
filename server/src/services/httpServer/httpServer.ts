import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import favicon from 'fastify-favicon'
import formbody from '@fastify/formbody'
import routesPlugin from '@fastify/routes'
import sensible from '@fastify/sensible'
import helmet from '@fastify/helmet'
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'

import { Renku } from '../../main'
import apiRoutes from '../../api/routes'
import { RENKU_APP_KEY } from '../../constants'
import { RenkuServerConfig } from '../../types'
import { AuthController } from '../oauth2/auth'
import { authorizeUser } from './authUser'

const httpMethods = ['GET', 'OPTIONS']

export class HttpServer {
  public static kName = 'http-server'

  public readonly log: Renku['log']

  private server: FastifyInstance

  private serverConfig: RenkuServerConfig

  private parent: Renku
  private auth: AuthController

  constructor(parent: Renku) {
    // @ts-ignore
    this.serverConfig = parent.config.server

    this.log = parent.log
    this.parent = parent

    this.auth = new AuthController(parent.config, this.log)
  }

  connect = async () => {
    this.server = Fastify({ logger: this.log })
    this.server.log.info('=> starting server at %s', new Date().toString())

    this.initialize(this.server)

    const { port, host } = this.serverConfig
    const address = await this.server.listen({ port, host })

    this.log.debug('Server is now listening on [%s]', address)
  }

  close = async () => {
    await this.server.close()
  }

  private async initialize(server: FastifyInstance) {
    // server.register(require('@fastify/jwt'), {
    //   secret: this.parent.config.auth.jwtSecret,
    // })

    //registerPassport(server, this.parent.config, this.log)
    // Inject app to have all services in handlers
    server.decorate(RENKU_APP_KEY, this.parent)

    server.register(cors, {
      origin: false,
    })

    server.register(favicon)
    server.register(formbody)
    server.register(sensible)

    // Authorization

    server.decorateRequest('user', '')
    server.decorateRequest('tokens', '')
    server.decorate("authenticate", authorizeUser)

    server.register(cookie, {
      secret: this.parent.config.auth.cookieSecret,
      hook: 'onRequest',
      parseOptions: {}     // options for parsing cookies
    } as FastifyCookieOptions)

    //registerPassport(server, this.tokens, this.parent.config, this.log)

    if (process.env.DEBUG) {
      server.addHook('preValidation', async (request, reply) => {
        const { params, query, body } = request
        request.log.info({ params, query, body }, `---> ${request.method} ${request.url}`)
      })
      server.addHook('onError', async (request, reply, error) => {
        request.log.info({ error }, `!ERROR on ${request.method} ${request.url} code=${reply.code}`)
      })
    }

    server.register(helmet, { contentSecurityPolicy: false })

    server.register(routesPlugin)

    server.register(apiRoutes, this.auth)

    this.auth.init(server)

    this.log.info('initialization complete')
  }
}
