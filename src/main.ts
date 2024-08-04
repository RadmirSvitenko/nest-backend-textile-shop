import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('port')

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Textile-Shop')
    .setDescription('This is test project from up my skills')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(port)
}
bootstrap()
