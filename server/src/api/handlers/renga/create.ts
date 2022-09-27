import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RENGA_NEW_NAME } from '../../../constants'
import { Renga } from '../../../models/renga'
import { RenkuApp } from '../../../module'


export const handler = async (service: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  const payload = JSON.parse(request.body as string) as Renga

  request.log.info({ payload }, 'create renga request')

  const renga: Partial<Renga> = {
    ...payload,
    name: payload.name || RENGA_NEW_NAME,
    id: payload.id || shortid(),
  }
  const result = await service.renga.createRenga(renga)

  reply.send({
    id: result?.id,
    type: 'renga',
    attributes: result
  })
}
