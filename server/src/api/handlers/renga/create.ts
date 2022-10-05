import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RenkuApp } from '../../../module'
import { RENGA_NEW_NAME } from '../../../constants'
import { Renga } from '../../../models/renga'

import { convertToResponse } from '../../../utils/jsonResponse'
import { CREATED } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  const payload = request.body as Renga
  request.log.info({ payload }, 'create renga request')

  const renga: Partial<Renga> = {
    ...payload,
    name: payload.name || RENGA_NEW_NAME,
    id: payload.id || shortid(),
  }

  const result = await app.renga.create(renga)

  request.log.info({ result }, 'renga created')

  reply
    .code(CREATED)
    .send(convertToResponse(result?.id, 'renga', result))
}
