import shortid from 'shortid'
import jwt from 'jsonwebtoken'
import { RenkuAuthConfig } from '../../types'
import { Token as Model } from '../../models/token'

export class TokenService {
  private config: RenkuAuthConfig

  constructor(config: RenkuAuthConfig) {
    this.config = config
  }
  private byUserId = (userId: Model['userId']) => Model.findOne<Model>({ userId })

  public generateTokens = (payload: Record<string, any>) => {
    const accessToken = jwt.sign(payload, this.config.jwtSecret, { expiresIn: '30min' })
    const refreshToken = jwt.sign(payload, this.config.jwtRefreshSecret, { expiresIn: '30d' })

    const verOk = jwt.verify(accessToken, this.config.jwtSecret)
    console.log('!!GENERATE_TOKEN', accessToken)
    console.log('!!VERIFIED', verOk)

    return {
      accessToken,
      refreshToken,
    }
  }

  public async saveToken(userId: string, refreshToken: string) {
    const token = await this.byUserId(userId)

    if (token) {
      token.refreshToken = refreshToken
      return token.save()
    }

    const created = await Model.create({ id: shortid(), userId, refreshToken })

    return created.save()
  }


  public verifyToken(accessToken: string) {
    try {
      const data = jwt.verify(accessToken, this.config.jwtSecret)
      console.log(`!!VERIFY_TOKEN  ${accessToken}`, data)

      return data

    } catch (err) {
      console.log(`BAD_TOKEN  ${accessToken}`, err)
      return null
    }
  }
}
