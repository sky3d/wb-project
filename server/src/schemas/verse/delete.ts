import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'

const requestSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  }
}

export const schema = {
  ...requestSchema,

  response: {
    200: responseSchema,
    ...errorSchemas
  }
}
