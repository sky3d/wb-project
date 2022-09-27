import { FastifyReply, FastifyRequest } from 'fastify'
import { Renga } from '../../../models/renga'
import { getRenga } from '../../../services/renga'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id } = request.params
  const data = JSON.parse(request.body as string) as Partial<Renga>

  request.log.info({ id, data }, 'update renga request')

  const result = await getRenga().update(id, data)
  reply.send(convertToResponse(result?.id, 'renga', result))
}
