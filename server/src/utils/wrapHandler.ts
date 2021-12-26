import { FastifyRequest, FastifyReply } from 'fastify'
import { getRenga } from '../services/renga'

export type RengaHttpHandler = {
  (service: Renga, request: FastifyRequest, reply: FastifyReply): any
}

export const wrapHandler = (handler: RengaHttpHandler) => (request: FastifyRequest, reply: FastifyReply) => {
  const service = getRenga()
  return handler(service, request, reply)
}
