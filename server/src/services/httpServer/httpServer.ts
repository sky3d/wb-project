import pino from 'pino'
import Fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import favicon from 'fastify-favicon'
import formbody from '@fastify/formbody'
import routesPlugin from 'fastify-routes'
import helmet from 'fastify-helmet'

import { RenkuApp } from '../../module'
import { Renku, RenkuServerConfig } from '../../main'
import apiRoutes from '../../api/routes'
import { RENKU_APP_KEY } from '../../constants'


const logger = pino()

export class HttpServer {
  public static kName = 'http-server'

  public readonly log: Renku['log']
  private server: FastifyInstance
  private config: RenkuServerConfig
  private parent: RenkuApp

  constructor(parent: RenkuApp) {
    //@ts-ignore
    this.config = parent.config.server
    this.log = parent.log
  }

  connect = async () => {
    this.server = Fastify({ logger: this.log })
    this.server.log.info('=> starting server at %s', new Date().toString())

    this.initialize(this.server)

    const address = await this.server.listen(this.config.port, this.config.host)
    this.log.debug('server is now listening on [%s]', address)
  }

  close = async () => {
    await this.server.close()
  }

  private async initialize(server: FastifyInstance) {
    server.register(cors)
    server.register(favicon)
    server.register(formbody)

    // disables the `contentSecurityPolicy` middleware but keeps the rest.
    server.register(helmet, { contentSecurityPolicy: false })
    server.register(routesPlugin)

    server.register(apiRoutes)
    server.decorate(RENKU_APP_KEY, this.parent)
  }
}

