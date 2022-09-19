import { FastifyReply, FastifyRequest } from 'fastify'
import { Domain } from '../../../interfaces'

export const handler = async (service: Renga, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params
  const data = JSON.parse(request.body as string) as Domain.Renga

  request.log.info({ id, data }, 'update renga request')

  const result = await service.storage.updateRenga(id, data)

  reply.send({
    id: result.id,
    type: 'renga',
    attributes: result
  })
}
