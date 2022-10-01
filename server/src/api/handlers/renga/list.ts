import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  const list = await app.renga.list()
  // TODO map response to json:api
  return reply.code(200).send(JSON.stringify(list))
}
