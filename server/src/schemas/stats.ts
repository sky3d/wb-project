export const schema = {
  response: {
    200: {
      type: 'object',
      additionalProperties: true,
      properties: {
        name: { type: 'string' },
        version: { type: 'string' },
        hostname: { type: 'string' },
        ip: { type: 'string' },
        uptime: { type: 'number' },
        status: { type: 'string' },
        running: { type: 'string' }
      }
    }
  }
}
