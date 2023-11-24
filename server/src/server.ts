require('dotenv').config()

import { Renku } from './main'
import { RenkuConfig } from './types'

let instance: Renku | null = null

function buildServer(config?: RenkuConfig) {
  instance = new Renku(config)

  return instance
}

export default buildServer
