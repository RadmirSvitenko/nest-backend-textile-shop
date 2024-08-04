import { forwardRef, Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category } from 'src/entities/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => ProductModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
