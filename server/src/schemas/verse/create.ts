import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'

const bodySchema = {
  type: 'object',
  additionalProperties: true,
  required: [
    'rengaId'
  ],
  properties: {
    rengaId: {
      type: 'string',
      minLength: 5,
    },
  }
}

export const schema = {
  body: bodySchema,

  response: {
    200: responseSchema,
    ...errorSchemas
  }
}
