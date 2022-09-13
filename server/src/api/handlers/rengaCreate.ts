import shortid from 'shortid'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Domain } from '../../interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
const handler = async (service: Renga, request: FastifyRequest, reply: FastifyReply) => {
  const payload = request.body as Domain.Renga
  request.log.info({ body: request.body }, 'renga.create request')

  const renga: Domain.Renga = {
    id: shortid(),
    name: payload.name || `Новая ренга`,
  }
  const result = await service.storage.createRenga(renga)

  request.log.info('renga created:', result)

  reply.send({
    id: result?.id,
    type: 'renga',
    attributes: result
  })
}

export const createHandler = handler
