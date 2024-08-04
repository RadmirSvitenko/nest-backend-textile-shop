import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import {
  CreateImageDTO,
  DeleteImageDTO,
  GetOneImageDTO,
  UpdateImageDTO,
} from './dto'
import { Image } from 'src/entities/image.entity'
import { ProductImageDelete, ProductImageResponse } from './response'
import { ProductService } from '../product/product.service'

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async createImage(dto: CreateImageDTO): Promise<ProductImageResponse> {
    const { imageUrl, productId } = dto

    const product = await this.productService.getProductById({ id: productId })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    const newImage = this.imageRepository.create({
      imageUrl: imageUrl,
      productId: productId,
    })

    const savedImage = await this.imageRepository.save(newImage)

    product.images.push(savedImage)
    await this.productService.saveImagesForProduct(product)

    return savedImage
  }

  async getImages(): Promise<ProductImageResponse[]> {
    const images = await this.imageRepository.find()
    return images.map((image) => ({
      id: image.id,
      imageUrl: image.imageUrl,
      productId: image.productId,
      product: image.product,
    }))
  }

  async updateImage(dto: UpdateImageDTO): Promise<ProductImageResponse> {
    const { id, imageUrl, productId } = dto

    const findImage = await this.imageRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!findImage) {
      throw new NotFoundException(`Изображение с id = ${id} не найдено`)
    }

    const updatedImage = await this.imageRepository.save({
      id: findImage.id,
      imageUrl: imageUrl,
      productId: productId,
      product: findImage.product,
    })

    return updatedImage
  }

  async deleteImage(dto: DeleteImageDTO): Promise<ProductImageDelete> {
    const deleteResult = await this.imageRepository.delete(dto.id)

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Изображение с id = ${dto.id} не найдено`)
    }
    return {
      message: `Операция по удалению выполнена`,
    }
  }

  async getImageById(dto: GetOneImageDTO): Promise<ProductImageResponse> {
    const findImageByID = await this.imageRepository.findOne({
      where: { id: dto.id },
    })

    if (!findImageByID) {
      throw new NotFoundException(`Изображение с id = ${dto.id} не найдено`)
    }

    return {
      id: findImageByID.id,
      imageUrl: findImageByID.imageUrl,
      productId: findImageByID.productId,
      product: findImageByID.product,
    }
  }

  async findImagesById(ids: number[]): Promise<ProductImageResponse[]> {
    return this.imageRepository.find({ where: { id: In(ids) } })
  }
}
