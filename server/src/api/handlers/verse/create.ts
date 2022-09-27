import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { Verse } from '../../../models/verse'
import { getVerse } from '../../../services/verse'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { rengaId } = request.params
  const payload = JSON.parse(request.body as string) as Verse

  request.log.info({ rengaId, payload }, 'create verse request')

  const verse: Partial<Verse> = {
    ...payload,
    id: payload.id || shortid(),
    rengaId,
  }

  const result = await getVerse().create(rengaId, verse)
  reply.send(convertToResponse(result?.id, 'verse', result))
}
