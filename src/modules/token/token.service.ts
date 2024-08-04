import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtServise: JwtService,
  ) {}

  async generateJwtToken(user: any) {
    const payload = { user }
    return this.jwtServise.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: this.configService.get('expire_jwt'),
    })
  }
}
