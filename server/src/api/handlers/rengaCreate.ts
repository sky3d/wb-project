import shortid from 'shortid'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Domain } from '../../interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
const handler = async (service: Renga, request: FastifyRequest, _: FastifyReply) => {
  const payload = request.body as Domain.Renga

  request.log.info({ body: request.body }, 'renga.create request')
  request.log.info('ping:', service.ping())

  const renga: Domain.Renga = {
    id: shortid(),
    name: payload.name || 'New renga',
  }
  // TODO save to database

  return renga
}

export const createHandler = handler
