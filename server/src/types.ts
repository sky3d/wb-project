export type RenkuConfig = {
  server: RenkuServerConfig
  auth: RenkuAuthConfig
  //typeorm: TypeormConfig
}

export type PassportOptions = {
  clientId: string
  clientSecret: string
  callback: string
}

export type RenkuAuthConfig = {
  passport?: {
    [provider: string]: PassportOptions
  }
  cookieKey?: string
}

export type RenkuServerConfig = {
  host: string
  port: number
}
