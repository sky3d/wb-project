export const server = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  clientURL: process.env.CLIENT_URL || 'http://localhost:4000',
}
