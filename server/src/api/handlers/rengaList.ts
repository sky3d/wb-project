import { FastifyReply, FastifyRequest } from 'fastify'
import * as shortid from 'shortid'
import { Domain } from '../../interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
const handler = async (service: Renga, request: FastifyRequest, _: FastifyReply) => {
  const payload = request.body as Domain.Renga

  request.log.info({ body: request.body }, 'renga.list request')

  const renga: Domain.Renga = {
    id: shortid.generate(),
    name: payload.name || 'New renga',
  }
  // TODO save to database

  return renga
}

export const listHandler = handler
