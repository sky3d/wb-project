import envSchema from 'env-schema'

interface ServerEnv {
  HOST: string,
  PORT: number,
}

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    HOST: {
      type: 'string',
      default: '127.0.0.1',
    },
    PORT: {
      type: 'number',
      default: 3000,
    }
  },
}

export const envConfig = envSchema<ServerEnv>({
  dotenv: true,
  schema,
})
