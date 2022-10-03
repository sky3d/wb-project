import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RenkuApp } from '../../../module'
import { Variant } from '../../../models/variant'
import { convertToResponse } from '../../../utils/jsonResponse'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const payload = request.body as Variant

  request.log.info({ payload }, 'create variant request')

  const variant: Partial<Variant> = {
    ...payload,
    id: payload.id || shortid(),

  }

  const result = await app.variant.create(variant)
  reply.send(convertToResponse(result?.id, 'variant', result))
}
