import pino from 'pino'
import fastify from 'fastify'
import cors from 'fastify-cors'
import favicon from 'fastify-favicon'
import formbody from '@fastify/formbody'
import routesPlugin from 'fastify-routes'
import helmet from 'fastify-helmet'

import { envConfig } from './configs/server'
import { renga } from './services/renga'
import { routes as apiRoutes } from './api/routes'

const logger = pino()

export async function main() {
  const app = fastify({
    logger
  })

  app.log.info('=> starting app %s', Date.now().toString())

  app.log.info('config %o', JSON.stringify(envConfig))
  app.decorate('config', envConfig)

  app.register(cors)
  app.register(favicon)
  app.register(formbody)

  // disables the `contentSecurityPolicy` middleware but keeps the rest.
  app.register(helmet, { contentSecurityPolicy: false })

  app.register(routesPlugin)
  app.register(apiRoutes)

  app.decorate('renga', renga(logger, {}))

  await app.ready()

  app.log.info('successfully booted')

  app.listen(
    // @ts-ignore
    app.config.PORT,
    // @ts-ignore
    app.config.HOST,
    () => {
      app.log.info({ routes: app.routes }, 'registered routes:')
      // console.log(app.routes)
    }
  )
}
