import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RenkuApp } from '../../../module'
import { RENGA_NEW_NAME } from '../../../constants'
import { Renga } from '../../../models/renga'

import { convertToResponse } from '../../../utils/jsonResponse'
import { CREATED } from '../../../utils/http'
import { RengaRole } from '../../../interfaces'


export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  const payload = request.body as Renga
  request.log.info({ payload }, 'create renga request')

  const renga: Partial<Renga> = {
    ...payload,
    name: payload.name || RENGA_NEW_NAME,
    id: payload.id || shortid(),
  }

  const userId = request.user.id

  const result = await app.renga.create(renga)
  await app.user.setUserRole(userId, renga.id, RengaRole.Admin)


  request.log.info({ userId, renga: result }, 'renga created')

  reply
    .code(CREATED)
    .send(convertToResponse(result?.id, 'renga', result))
}
