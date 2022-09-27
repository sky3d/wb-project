import { PluginConnector, RenkuApp } from '../../module'
import { HttpServer } from './httpServer'

let instance: HttpServer | null = null

export function server(parent: RenkuApp): { connect: PluginConnector, close: PluginConnector } {
  async function connect() {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    instance = parent.server = new HttpServer(parent)
    await instance.connect()
  }

  // eslint-disable-next-line require-await
  async function close() {
    try {
      if (instance instanceof HttpServer) {
        await instance.close()
      }
    } catch (e) {
      parent.log.error({ err: e }, 'could not stop http service')
    } finally {
      instance = null
    }
  }

  parent.addConnector(HttpServer.kName, connect)
  parent.addDestructor(HttpServer.kName, close)

  return {
    connect,
    close,
  }
}

export function getServer(): HttpServer | never {
  if (instance instanceof HttpServer) {
    return instance
  }

  throw new Error('http server is not initialized')
}
