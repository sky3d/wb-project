import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { getRenga } from '../../../services/renga'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  const list = await getRenga().list()
  return reply.code(200).send(JSON.stringify(list))
}
