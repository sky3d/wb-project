import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../module'
import { OK } from '../../utils/http'

export const handler = async (app: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  reply
    .type('application/json')
    .code(OK)
    .send(request.user)
}
