import { FastifyReply, FastifyRequest } from 'fastify'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handler = async (service: Renga, request: FastifyRequest, reply: FastifyReply) => {
  const list = await service.storage.list()
  return reply.code(200).send(JSON.stringify(list))
}
