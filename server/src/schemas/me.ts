export const schema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        token: { type: 'string' },
      }
    }
  }
}
