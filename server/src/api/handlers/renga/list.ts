import { FastifyReply, FastifyRequest } from 'fastify'
import { RenkuApp } from '../../../module'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handler = async (service: RenkuApp, request: FastifyRequest, reply: FastifyReply) => {
  const list = await service.renga.list()
  return reply.code(200).send(JSON.stringify(list))
}
