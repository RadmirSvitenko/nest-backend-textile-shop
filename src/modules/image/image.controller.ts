import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Post, Delete } from '@nestjs/common'
import { ImageService } from './image.service'
import {
  CreateImageDTO,
  UpdateImageDTO,
  DeleteImageDTO,
  GetOneImageDTO,
} from './dto'
import { ProductImageResponse, ProductImageDelete } from './response'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiTags('Images')
  @ApiResponse({ status: 201, type: ProductImageResponse })
  @Post('create')
  create(@Body() dto: CreateImageDTO): Promise<ProductImageResponse> {
    return this.imageService.createImage(dto)
  }

  @ApiTags('Images')
  @ApiResponse({ status: 200, type: [ProductImageResponse] })
  @Get('get')
  read(): Promise<ProductImageResponse[]> {
    return this.imageService.getImages()
  }

  @ApiTags('Images')
  @ApiResponse({ status: 200, type: ProductImageResponse })
  @Put('update')
  update(@Body() dto: UpdateImageDTO): Promise<ProductImageResponse> {
    return this.imageService.updateImage(dto)
  }

  @ApiTags('Images')
  @ApiResponse({ status: 204, type: ProductImageResponse })
  @Delete('delete')
  delete(@Body() dto: DeleteImageDTO): Promise<ProductImageDelete> {
    return this.imageService.deleteImage(dto)
  }

  @ApiTags('Images')
  @ApiResponse({ status: 200, type: ProductImageResponse })
  @Get(':id')
  readOne(@Body() dto: GetOneImageDTO): Promise<ProductImageResponse> {
    return this.imageService.getImageById(dto)
  }
}
