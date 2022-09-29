export const schema = {
  type: 'object',

  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      }
    }
  }
}
