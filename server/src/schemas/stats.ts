export const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        version: { type: 'string' },
        hostname: { type: 'string' },
        ip: { type: 'string' },
        uptime: { type: 'number' },
        status: { type: 'string' },
        running: { type: 'string' },
        user: { type: 'string' },
        db: {
          type: 'object',
          properties: {
            renga: { type: 'number' },
            verse: { type: 'number' },
          }
        },
        request: {
          type: 'object',
          properties: {
            body: { type: 'string' },
            params: { type: 'string' },
            query: { type: 'string' },
          }
        }
      }
    }
  }
}
