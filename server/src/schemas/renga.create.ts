import { errorSchemas } from './common'

const requestSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    status: {
      type: 'number',
    },
  },
}

const responseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
}

export const schema = {
  ...requestSchema,
  response: {
    200: responseSchema,
    ...errorSchemas,
  },
}
