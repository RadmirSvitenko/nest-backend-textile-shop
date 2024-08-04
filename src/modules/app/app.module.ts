import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from 'src/configuration'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../users/user.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    TokenModule,
    ProductModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('db_port'),
        host: configService.get('db_host'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        entities: [__dirname + '/../../*/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
