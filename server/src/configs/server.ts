import envSchema from 'env-schema'

interface ServerEnv {
  PORT: string,
  HOST: string,
}

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    HOST: {
      type: 'string',
      default: '127.0.0.1',
    },
  },
}

export const envConfig = envSchema<ServerEnv>({
  dotenv: true,
  schema,
})

// export type EnvSchemaData = {
//   [key: string]: unknown
// }
