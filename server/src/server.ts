import { Renku, RenkuConfig } from './main'

let instance: Renku | null = null

function buildServer(config?: RenkuConfig) {
  instance = new Renku(config)

  return instance
}

export default buildServer
