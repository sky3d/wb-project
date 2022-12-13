export type RenkuConfig = {
  server: RenkuServerConfig
  auth: RenkuAuthConfig
  app: RenkuAppConfig
  //typeorm: TypeormConfig
}

export interface OAuthCredentials {
  clientId: string
  clientSecret: string
  callbackURL: string
}

export type RenkuAppConfig = {
  clientHost: string
}

export type RenkuAuthConfig = {
  providers: Record<string, OAuthCredentials>,
  cookieKey?: string,
  jwtSecret: string,
  jwtRefreshSecret: string
}

export type RenkuServerConfig = {
  host: string
  port: number
}
