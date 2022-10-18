export type RenkuConfig = {
  server: RenkuServerConfig
  auth: RenkuAuthConfig
  //typeorm: TypeormConfig
}

export interface PassportOptions {
  clientID: string
  clientSecret: string
  callbackURL: string
}

export type RenkuAuthConfig = {
  passport: Record<string, PassportOptions>,
  cookieKey?: string
}

export type RenkuServerConfig = {
  host: string
  port: number
}
