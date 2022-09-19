import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'

const requestSchema = {
  type: 'object'
}

export const schema = {
  ...requestSchema,

  response: {
    200: responseSchema,
    ...errorSchemas
  }
}
