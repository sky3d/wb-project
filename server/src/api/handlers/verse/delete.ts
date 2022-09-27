import { FastifyReply, FastifyRequest } from 'fastify'
import { getVerse } from '../../../services/verse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params

  request.log.info({ id }, 'delete verse request')

  await getVerse().remove(id)

  reply.code(200)
}
