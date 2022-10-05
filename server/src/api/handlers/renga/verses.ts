import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'
import { OK } from '../../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  // @ts-ignore
  const { id: rengaId } = request.params
  request.log.info({ rengaId }, 'renga verses request')

  const list = await app.verse.list(rengaId)
  // TODO map response to json:api
  reply
    .code(OK)
    .send(JSON.stringify(list))
}
