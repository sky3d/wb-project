import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RenkuApp } from '../../../module'
import { Variant } from '../../../models/variant'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const payload = JSON.parse(request.body as string) as Variant

  request.log.info({ payload }, 'create variant request')

  const { rengaId, number = 0 } = payload

  if (!rengaId) {
    // TODO use HttpError
    throw new Error('renga is not specified')
  }
  if (number === 0) {
    // TODO use HttpError
    throw new Error('incorrect verse number')
  }

  const variant: Partial<Variant> = {
    ...payload,
    id: payload.id || shortid(),

  }

  const result = await app.variant.create(variant)
  reply.send(convertToResponse(result?.id, 'variant', result))
}
