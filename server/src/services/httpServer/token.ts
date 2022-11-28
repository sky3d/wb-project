import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../configs/auth'
import { RenkuAuthConfig } from '../../types'
import { getUser } from '../user'

export class TokenService {
  private config: RenkuAuthConfig

  constructor(config: RenkuAuthConfig) {
    this.config = config
  }

  generateToken = (payload: Record<string, any>) => {
    const accessToken = jwt.sign(payload, this.config.jwtSecret, { expiresIn: '30min' })
    const refreshToken = jwt.sign(payload, this.config.jwtRefreshSecret, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const userService = getUser()
    const user = await userService.byId(userId)

    if (user?.token) {
      await userService.update(userId, { token: refreshToken })
    }
  }

  // verifyToken = async (token) => {
  //   try {
  //     //await req.jwtVerify()
  //   } catch (err) {
  //   }
  // }
}
