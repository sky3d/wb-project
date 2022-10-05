import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { OK } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  const list = await app.renga.list()
  // TODO map response to json:api
  reply
    .code(OK)
    .send(JSON.stringify(list))
}
