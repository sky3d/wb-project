import { merge } from 'lodash'
import { BaseOptions, PluginConnector, PluginContainer, RenkuApp } from './module'
import { envConfig } from './configs/server'
import { typeorm } from './utils/typeorm'

import { server } from './services/httpServer'
import { renga } from './services/renga'
import { verse } from './services/verse'
import { variant } from './services/variant'

import { logger } from './utils/logger'


export type RenkuConfig = {
  server: RenkuServerConfig
  //typeorm: TypeormConfig
}

export type RenkuServerConfig = {
  host: string
  port: number
}

export class Renku implements RenkuApp {
  static defaultOpts = {
    server: {
      host: envConfig.HOST, port: envConfig.PORT
    }
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
