import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { OK } from '../../../utils/http'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params

  request.log.info({ id }, 'delete verse request')

  const result = await app.verse.remove(id)

  reply
    .code(OK)
    .send(convertToResponse(id, 'verse', result))
}
