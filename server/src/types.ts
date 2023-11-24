export type RenkuConfig = {
  server: RenkuServerConfig
  auth: RenkuAuthConfig
  // app: RenkuAppConfig
  //typeorm: TypeormConfig
}

export interface OAuthCredentials {
  clientId: string
  clientSecret: string
  callbackURL: string
}

export type RenkuAppConfig = {
}

export type RenkuAuthConfig = {
  providers: Record<string, OAuthCredentials>,
  cookieKey: string,
  cookieSecret: string,
  cookieExpiresMin: number
  jwtSecret: string,
  jwtRefreshSecret: string
}

export type RenkuServerConfig = {
  host: string
  port: number
  clientURL: string
}
