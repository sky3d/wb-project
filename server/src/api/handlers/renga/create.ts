import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { Domain } from '../../../interfaces'

export const handler = async (service: Renga, request: FastifyRequest, reply: FastifyReply) => {
  const payload = JSON.parse(request.body as string) as Domain.Renga

  request.log.info({ payload }, 'create renga request')

  const renga: Domain.Renga = {
    id: shortid(),
    name: payload.name || 'Новая ренга'
  }
  const result = await service.storage.createRenga(renga)

  reply.send({
    id: result?.id,
    type: 'renga',
    attributes: result
  })
}
