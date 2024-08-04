import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { TagService } from './tag.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTagDTO, DeleteTagDTO, GetOneTagDTO, UpdateTagDTO } from './dto'
import { ProductTagDelete, ProductTagResponse } from './response'

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiTags('Tags')
  @ApiResponse({ status: 201, type: ProductTagResponse })
  @Post('create')
  create(@Body() dto: CreateTagDTO): Promise<ProductTagResponse> {
    return this.tagService.createTag(dto)
  }

  @ApiTags('Tags')
  @ApiResponse({ status: 200, type: [ProductTagResponse] })
  @Get('get')
  getAll(): Promise<ProductTagResponse[]> {
    return this.tagService.getAllTags()
  }

  @ApiTags('Tags')
  @ApiResponse({ status: 200, type: ProductTagResponse })
  @Post(':id')
  getOne(@Body() dto: GetOneTagDTO): Promise<ProductTagResponse> {
    return this.tagService.getTagById(dto)
  }

  @ApiTags('Tags')
  @ApiResponse({ status: 200, type: ProductTagResponse })
  @Put('update')
  update(@Body() dto: UpdateTagDTO): Promise<ProductTagResponse> {
    return this.tagService.updateTag(dto)
  }

  @ApiTags('Tags')
  @ApiResponse({ status: 204, type: ProductTagDelete })
  @Delete('delete')
  delete(@Body() dto: DeleteTagDTO): Promise<ProductTagDelete> {
    return this.tagService.deleteTag(dto)
  }
}
