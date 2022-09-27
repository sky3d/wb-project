type Renku = import('./main').Renku

export type PluginConnector = () => PromiseLike<any>

// export interface PluginContainer {
//   name: string
//   [property: string]: unknown
// }

export interface RenkuApp {
  addConnector: any
  addDestructor: any
  addMigrator: any

  log: any

  // plugins
  typeorm: any
  server: HttpServer
  renga: Renga
  verse: Verse

  // /**
  //  * Allow Extensions
  //  */
  // [property: string]: any
}


export interface PluginInterface {
  connect?: PluginConnector
  close?: PluginConnector
}

//export type ConnectorsTypes = 'service' | 'migration'

export type BaseOptions = Record<string, unknown>


export type ConnectorContainer = {
  [K in ConnectorsTypes]: PluginConnector[]
}

declare module "fastify" {
  interface FastifyInstance {
    app: RenkuApp
  }
}
