import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { getVerse } from '../../../services/verse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { rengaId } = request.params

  const list = await getVerse().list(rengaId)
  // TODO map response to json:api
  return reply.code(200).send(JSON.stringify(list))
}
