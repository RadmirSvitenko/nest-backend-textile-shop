import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from 'src/strategy'
import { UserModule } from '../users/user.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
