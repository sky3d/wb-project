import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { Verse } from '../../../models/verse'
import { getVerse } from '../../../services/verse'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const payload = JSON.parse(request.body as string) as Verse

  request.log.info({ payload }, 'create verse request')

  const { rengaId } = payload

  if (!rengaId) {
    // TODO use HttpError
    throw new Error('renga is not specified')
  }

  const verse: Partial<Verse> = {
    ...payload,
    id: payload.id || shortid(),

  }

  const result = await getVerse().create(verse)
  reply.send(convertToResponse(result?.id, 'verse', result))
}
