import { merge } from 'lodash'
//import dotenv from 'dotenv'
import { BaseOptions, PluginConnector, RenkuApp } from './module'
import { envConfig } from './configs/server'
import { auth as authConfig } from './configs/auth'
import { app as appConfig } from './configs/app'
import { typeorm } from './utils/typeorm'
import { logger } from './utils/logger'

import { RenkuConfig } from './types'

import { server } from './services/httpServer'
import { renga } from './services/renga'
import { verse } from './services/verse'
import { variant } from './services/variant'
import { user } from './services/user'

export class Renku implements RenkuApp {
  static defaultOpts = {
    server: {
      host: envConfig.HOST, port: envConfig.PORT
    },
    auth: authConfig,
    app: appConfig
  }

  public readonly log: any

  private connectors: Map<string, PluginConnector> = new Map<string, PluginConnector>()
  private destructors: Map<string, PluginConnector> = new Map<string, PluginConnector>()
  private migrator: PluginConnector

  public config: RenkuConfig

  constructor(options: Partial<BaseOptions> = {}) {
    this.config = merge({}, Renku.defaultOpts, options)
    this.log = logger

    // TODO this.on('error', this.onError)
    typeorm(this)
    renga(this)
    verse(this)
    variant(this)
    user(this)

    server(this)
  }

  /*
      Plugin container
  */
  [property: string]: unknown

  public addConnector(serviceName: string, handler: PluginConnector) {
    this.log.debug(`add ${serviceName} connector`)
    this.connectors.set(serviceName, handler)
  }
  public addDestructor(serviceName: string, handler: PluginConnector) {
    this.log.debug(`add ${serviceName} destructor`)
    this.destructors.set(serviceName, handler)
  }

  public addMigrator(serviceName: string, handler: PluginConnector) {
    this.log.debug(`add ${serviceName} migrator`)
    this.migrator = handler
  }

  public async start() {
    this.log.debug('app staring')

    for (const [key, connect] of this.connectors) {
      console.log(`connecting ${key}`)
      await connect()
    }

    if (this.migrator) {
      this.log.debug('migrating...')
      await this.migrator()
    }

    this.log.info('successfully booted')
  }

  public async close() {
    // TODO reverse
    for (const [_, close] of this.destructors) {
      await close()
    }

    this.log.info('successfully finilized')
  }
}
