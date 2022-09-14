import { errorSchemas } from '../common'

const requestSchema = {
  type: 'object'
}

const responseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    attributes: {
      type: 'object'
    }
  }
}

export const schema = {
  ...requestSchema,
  response: {
    200: responseSchema,
    ...errorSchemas
  }
}
