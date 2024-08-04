import { forwardRef, Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from 'src/entities/product.entity'
import { TagModule } from '../tag/tag.module'
import { CategoryModule } from '../category/category.module'
import { Tag } from 'src/entities/tag.entity'
import { Image } from 'src/entities/image.entity'
import { Category } from 'src/entities/category.entity'
import { ImageModule } from '../image/image.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Tag, Image, Category]),
    forwardRef(() => ImageModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => TagModule),
    TagModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
