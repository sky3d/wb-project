import { FastifyRequest, FastifyReply } from 'fastify'
// eslint-disable-next-line
import { RenkuApp } from '../module'

import { getRenga } from '../services/renga'

export type RengaHttpHandler = {
  (service: RenkuApp, request: FastifyRequest, reply: FastifyReply): any
}

export const wrapHandler = (handler: RengaHttpHandler) => (request: FastifyRequest, reply: FastifyReply) => {
  // TODO fix this hack !
  const service = getRenga()

  // @ts-ignore
  return handler(service.parent, request, reply)
}
