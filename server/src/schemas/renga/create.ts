import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'

const rengaSchema = {
  type: 'object',
  required: [
    'name',
    'owner'
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
    },
    owner: {
      type: 'string',
      minLength: 1,
    },
  }
}

export const schema = {
  body: rengaSchema,

  response: {
    201: responseSchema,
    ...errorSchemas
  }
}
