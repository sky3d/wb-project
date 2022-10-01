import { FastifyReply, FastifyRequest } from 'fastify'
import { getRenga } from '../../../services/renga'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  const list = await getRenga().list()
  // TODO map response to json:api
  return reply.code(200).send(JSON.stringify(list))
}
