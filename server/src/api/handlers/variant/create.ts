import { FastifyReply, FastifyRequest } from 'fastify'
import shortid from 'shortid'
import { RenkuApp } from '../../../module'
import { Variant } from '../../../models/variant'
import { convertToResponse } from '../../../utils/jsonResponse'
import { CREATED } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const payload = request.body as Variant

  request.log.info({ payload }, 'create variant request')

  const variant: Partial<Variant> = {
    ...payload,
    id: payload.id || shortid(),

  }

  const result = await app.variant.create(variant)

  reply
    .code(CREATED)
    .send(convertToResponse(result?.id, 'variant', result))
}
