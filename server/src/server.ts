import fastify from 'fastify'
import cors from 'fastify-cors'
import pino from 'pino'

import { envConfig } from './configs/server'
import { renga } from './services/renga'

const logger = pino()

export async function main() {
  const app = fastify({
    logger,
  })

  app.log.info('=> Starting http app')

  app.log.info('config %o', JSON.stringify(envConfig))
  app.decorate('config', envConfig)

  app.register(cors)

  app.decorate('renga', renga(logger, {}))

  // @ts-ignore
  const { PORT, HOST } = app.config
  await app.listen(PORT, HOST)
}
