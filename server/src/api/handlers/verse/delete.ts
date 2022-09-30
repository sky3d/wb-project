import { FastifyReply, FastifyRequest } from 'fastify'
import { getVerse } from '../../../services/verse'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params

  request.log.info({ id }, 'delete verse request')

  const result = await getVerse().remove(id)

  reply.send(convertToResponse(id, 'verse', result))
}
