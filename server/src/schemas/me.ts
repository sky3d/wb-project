import { errorSchemas } from './errors'

export const schema = {
  response: {
    200: {
      type: 'object',
      additionalProperties: true,
      properties: {
        user: {
          id: { type: 'string' },
          name: { type: 'string' },
          avatar: { type: 'string' },
        },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    }
  }
}
