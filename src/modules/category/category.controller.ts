import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoryService } from './category.service'
import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  // UseGuards,
  Delete,
} from '@nestjs/common'
import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  GetOneCategoryDTO,
  UpdateCategoryDTO,
} from './dto'
import { ProductCategoryDelete, ProductCategoryResponse } from './response'
// import { jwtAuthGuard } from 'src/guards/jwt-guard'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('Category')
  @ApiResponse({ status: 201, type: ProductCategoryResponse })
  // @UseGuards(jwtAuthGuard)
  @Post('create')
  create(@Body() dto: CreateCategoryDTO): Promise<ProductCategoryResponse> {
    return this.categoryService.createCategory(dto)
  }

  @ApiTags('Category')
  @ApiResponse({ status: 200, type: [ProductCategoryResponse] })
  @Get('get')
  read(): Promise<ProductCategoryResponse[]> {
    return this.categoryService.getCategories()
  }

  @ApiTags('Category')
  @ApiResponse({ status: 200, type: ProductCategoryResponse })
  // @UseGuards(jwtAuthGuard)
  @Put('update')
  update(@Body() dto: UpdateCategoryDTO): Promise<ProductCategoryResponse> {
    return this.categoryService.updateCategory(dto)
  }

  @ApiTags('Category')
  @ApiResponse({ status: 204, type: ProductCategoryResponse })
  // @UseGuards(jwtAuthGuard)
  @Delete('delete')
  delete(@Body() dto: DeleteCategoryDTO): Promise<ProductCategoryDelete> {
    return this.categoryService.deleteCategory(dto)
  }

  @ApiTags('Category')
  @ApiResponse({ status: 200, type: ProductCategoryResponse })
  // @UseGuards(jwtAuthGuard)
  @Get(':id')
  readOne(@Body() dto: GetOneCategoryDTO): Promise<ProductCategoryResponse> {
    return this.categoryService.getCategoryById(dto)
  }
}
