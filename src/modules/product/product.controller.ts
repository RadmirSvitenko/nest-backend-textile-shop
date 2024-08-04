import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateProductDTO,
  DeleteProductDTO,
  GetOneProductDTO,
  UpdateProductDTO,
} from './dto'
import { ProductResponse, ProductResponseDelete } from './response'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({ status: 201, type: ProductResponse })
  @ApiTags('Products')
  @Post('create')
  create(@Body() dto: CreateProductDTO) {
    return this.productService.createProduct(dto)
  }

  @ApiResponse({ status: 200, type: [ProductResponse] })
  @ApiTags('Products')
  @Get('get')
  getAll() {
    return this.productService.getProducts()
  }

  @ApiResponse({ status: 200, type: ProductResponse })
  @ApiTags('Products')
  @Post(':id')
  getOne(@Body() dto: GetOneProductDTO) {
    return this.productService.getProductById(dto)
  }

  @ApiResponse({ status: 200, type: ProductResponse })
  @ApiTags('Products')
  @Put('update')
  update(@Body() dto: UpdateProductDTO) {
    return this.productService.getProductById(dto)
  }

  @ApiResponse({ status: 204, type: ProductResponseDelete })
  @ApiTags('Products')
  @Delete('delete')
  delete(@Body() dto: DeleteProductDTO) {
    return this.productService.deleteProduct(dto)
  }
}
