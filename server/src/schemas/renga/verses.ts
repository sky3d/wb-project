import { errorSchemas } from '../errors'
import { responseSchema } from '../jsonApiResponse'
import { stringIdSchema } from '../stringId'

export const schema = {
  params: stringIdSchema,

  response: {
    201: responseSchema,
    ...errorSchemas
  }
}
