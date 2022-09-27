import { merge, reverse } from 'lodash'
import { RenkuApp, BaseOptions, PluginConnector } from './module'
import { envConfig } from './configs/server'
import { typeorm } from './utils/typeorm'

import { server } from './services/httpServer'
import { renga } from './services/renga'
import { TypeormConfig } from './configs/typeorm'

import { HttpServer } from './services/httpServer/httpServer'
import { Renga } from './services/renga/renga'
import { throws } from 'assert'
import { logger } from './utils/logger'
//import { Verse } from './services/verse/verse'


export type RenkuConfig = {
  server: RenkuServerConfig
  //typeorm: TypeormConfig
}

export type RenkuServerConfig = {
  host: string
  port: number
}

export class Renku {
  static defaultOpts = {
    server: {
      host: envConfig.HOST, port: envConfig.PORT
    }
  }

  //readonly plugins: any[]
  public readonly log: any

  private connectors: Map<string, PluginConnector> = new Map<string, PluginConnector>()
  private destructors: Map<string, PluginConnector> = new Map<string, PluginConnector>()
  private migrator: PluginConnector

  public config: RenkuConfig

  // TODO re-write & hide to plugins
  public typeorm: any
  public server: HttpServer
  public renga: Renga

  constructor(options: Partial<BaseOptions> = {}) {
    this.config = merge({}, Renku.defaultOpts, options)
    this.log = logger

    // this.on('error', this.onError)

    typeorm(this)
    renga(this)

    server(this)
  }

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

  public async finish() {
    // TODO reverse
    for (const [_, close] of this.destructors) {
      await close()
    }

    this.log.info('successfully finilized')
  }
}
