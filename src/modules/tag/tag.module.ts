import { forwardRef, Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from 'src/entities/tag.entity'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), forwardRef(() => ProductModule)],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
