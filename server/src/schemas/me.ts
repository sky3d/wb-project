import { errorSchemas } from './errors'

export const schema = {
  response: {
    200: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        avatar: { type: 'string' },
      },
    }
  }
}
