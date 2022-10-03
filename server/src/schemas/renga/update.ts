import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'
import { stringIdSchema } from '../stringId'

const rengaSchema = {
  type: 'object',
  required: [
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
    },
    status: {
      type: 'integer',
      enum: [
        1, 2, 3
      ]
    },
    options: {
      type: 'object',
      properties: {
        activeVerseNumber: {
          type: 'number',
        },
      }
    },
  }
}

export const schema = {
  params: stringIdSchema,

  body: rengaSchema,

  response: {
    200: responseSchema,
    ...errorSchemas
  }
}
