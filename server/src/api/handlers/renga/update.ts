import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { Renga } from '../../../models/renga'
import { convertToResponse } from '../../../utils/jsonResponse'
import { OK } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params
  const data = request.body as Partial<Renga>

  request.log.info({ id, data }, 'update renga request')

  const result = await app.renga.update(id, data)

  reply
    .code(OK)
    .send(convertToResponse(result?.id, 'renga', result))
}
