import { FastifyReply, FastifyRequest } from 'fastify'
import { Verse } from '../../../models/verse'
import { getVerse } from '../../../services/verse'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params
  const data = JSON.parse(request.body as string) as Partial<Verse>

  request.log.info({ id, data }, 'update verse request')

  const result = await getVerse().update(id, data)
  reply.send(convertToResponse(result.id, 'verse', result))
}
