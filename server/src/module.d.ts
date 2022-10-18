type Renku = import('./main').Renku

export type PluginConnector = () => PromiseLike<any>

export interface PluginContainer {
  [property: string]: any
}

export interface RenkuApp extends PluginContainer {
  addConnector: any
  addDestructor: any
  addMigrator: any
  log: Renku['log']
}

export interface PluginInterface {
  connect?: PluginConnector
  close?: PluginConnector
}

export type BaseOptions = Record<string, unknown>


export type ConnectorContainer = {
  [K in ConnectorsTypes]: PluginConnector[]
}

declare module "fastify" {
  interface FastifyInstance {
    app: RenkuApp,
  }
  interface PassportUser {
    displayName: string
  }
}
