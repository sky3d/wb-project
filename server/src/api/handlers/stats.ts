import { FastifyReply, FastifyRequest } from 'fastify'

export const handler = (request: FastifyRequest, reply: FastifyReply) => {
  const pckg = require('../../../../package.json')
  const data = {
    name: pckg.name,
    version: pckg.version,
    hostname: request.hostname,
    ip: request.ip,
    uptime: process.uptime().toFixed(2),
    status: 'RUNNING',
    user: 'un-authorized',
    db: {
      renga: 0,
      verse: 0,
    },
    request: {
      body: JSON.stringify(request?.body),
      params: JSON.stringify(request?.params),
      query: JSON.stringify(request?.query),
    }
  }

  reply
    .type('application/json')
    .code(200)
    .send(data)
}