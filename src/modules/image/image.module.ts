import { forwardRef, Module } from '@nestjs/common'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from 'src/entities/image.entity'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => ProductModule)],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
