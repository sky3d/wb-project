import { FastifyRequest, FastifyReply } from 'fastify'
// eslint-disable-next-line
import { RenkuApp } from '../module'

export type RengaHttpHandler = {
  (app: RenkuApp, request: FastifyRequest, reply: FastifyReply): any
}

export const wrapHandler = (
  app: RenkuApp,
  handler: RengaHttpHandler
) => (request: FastifyRequest, reply: FastifyReply) => handler(app, request, reply)
