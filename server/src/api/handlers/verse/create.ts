import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RenkuApp } from '../../../module'
import { Verse } from '../../../models/verse'
import { convertToResponse } from '../../../utils/jsonResponse'
import { CREATED } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const payload = request.body as Partial<Verse>

  request.log.info({ payload }, 'create verse request')

  const verse: Partial<Verse> = {
    ...payload,
    id: payload.id || shortid(),
  }

  const result = await app.verse.create(verse)

  reply
    .code(CREATED)
    .send(convertToResponse(result?.id, 'verse', result))
}
