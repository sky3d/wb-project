export const responseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 5,
    },
    type: {
      type: 'string',
      enum: [
        'renga', 'verse', 'variant'
      ]
    },
    attributes: {
      type: 'object',
      additionalProperties: true
    }
  }
}
