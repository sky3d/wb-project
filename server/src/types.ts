export type RenkuConfig = {
  server: RenkuServerConfig
  auth: RenkuAuthConfig
  app: RenkuAppConfig
  //typeorm: TypeormConfig
}

export interface PassportOptions {
  clientID: string
  clientSecret: string
  callbackURL: string
}

export type RenkuAppConfig = {
  clientHost: string
}

export type RenkuAuthConfig = {
  passport: Record<string, PassportOptions>,
  cookieKey?: string,
  jwtSecret: string,
  jwtRefreshSecret: string
}

export type RenkuServerConfig = {
  host: string
  port: number
}
