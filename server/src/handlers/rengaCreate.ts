import { create } from 'domain'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as shortid from 'shortid'
import { Renku } from '../interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  const payload = request.body as Renku

  request.log.info({ body: request.body }, '!!!!renga.create request')

  const renga: Renku = {
    id: shortid.generate(),
    name: payload.name || 'New renga',
  }
  // TODO save to database

  return renga
}
