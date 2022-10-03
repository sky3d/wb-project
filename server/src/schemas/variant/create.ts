import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'

const bodySchema = {
  type: 'object',
  required: [
    'rengaId',
    'number'
  ],
  properties: {
    rengaId: {
      type: 'string',
      minLength: 1,
    },
    number: {
      type: 'integer',
      minimum: 1,
      maximum: 100,
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
