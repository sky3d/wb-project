import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { Verse } from '../../../models/verse'
import { convertToResponse } from '../../../utils/jsonResponse'
import { OK } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params
  const data = request.body as Partial<Verse>

  request.log.info({ id, data }, 'update verse request')

  const result = await app.verse.update(id, data)

  reply
    .code(OK)
    .send(convertToResponse(result.id, 'verse', result))
}
