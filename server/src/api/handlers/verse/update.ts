import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { Verse } from '../../../models/verse'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params
  const data = JSON.parse(request.body as string) as Partial<Verse>

  request.log.info({ id, data }, 'update verse request')

  const result = await app.verse.update(id, data)
  reply.send(convertToResponse(result.id, 'verse', result))
}
