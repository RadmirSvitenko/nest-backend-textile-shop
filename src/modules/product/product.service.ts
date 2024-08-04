import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from 'src/entities/product.entity'
import { ProductResponse, ProductResponseDelete } from './response'
import {
  CreateProductDTO,
  DeleteProductDTO,
  GetOneProductDTO,
  UpdateProductDTO,
} from './dto'
import { TagService } from '../tag/tag.service'
import { CategoryService } from '../category/category.service'
import { ImageService } from '../image/image.service'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => ImageService))
    private readonly imageService: ImageService,
  ) {}

  async createProduct(dto: CreateProductDTO): Promise<ProductResponse> {
    const tagIds = Array.isArray(dto.tags) ? dto.tags : []
    const imageIds = Array.isArray(dto.images) ? dto.images : []
    const categoryIds = Array.isArray(dto.categories) ? dto.categories : []

    const tags = await this.tagService.findTagsById(tagIds)
    const images = await this.imageService.findImagesById(imageIds)
    const categories =
      await this.categoryService.findCategoriesById(categoryIds)

    const existProduct = await this.productRepository.findOne({
      where: { title: dto.title },
      relations: ['tags', 'images', 'categories'],
    })

    if (existProduct) {
      throw new ConflictException('Продукт с таким названием уже существует')
    }

    if (tagIds.length > 0 && tagIds.length !== tags.length) {
      throw new NotFoundException('Некоторые теги не найдены')
    }

    // Проверяем, что если переданы id изображений, то все изображения найдены
    if (imageIds.length > 0 && imageIds.length !== images.length) {
      throw new NotFoundException('Некоторые изображения не найдены')
    }

    // Проверяем, что если переданы id категорий, то все категории найдены
    if (categoryIds.length > 0 && categoryIds.length !== categories.length) {
      throw new NotFoundException('Некоторые категории не найдены')
    }
    const newProduct = this.productRepository.create({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      discount: dto.discount,
      rating: dto.rating || 5,
      tags: tags,
      images: images,
      categories: categories,
      brand: dto.brand,
    })

    const savedProduct = await this.productRepository.save(newProduct)

    const responseProduct = {
      id: savedProduct.id,
      title: savedProduct.title,
      description: savedProduct.description,
      price: savedProduct.price,
      discount: savedProduct.discount,
      rating: savedProduct.rating,
      tags: savedProduct.tags.map((tag) => tag),
      images: savedProduct.images.map((image) => image),
      categories: savedProduct.categories.map((category) => category),
      brand: savedProduct.brand,
    }
    return responseProduct
  }

  async getProducts(): Promise<ProductResponse[]> {
    const products = await this.productRepository.find({
      relations: ['tags', 'images', 'categories'],
    })

    const responseProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      tags: product.tags.map((tag) => tag),
      images: product.images.map((image) => image),
      categories: product.categories.map((category) => category),
      brand: product.brand,
    }))

    return responseProducts
  }

  async getProductById(dto: GetOneProductDTO) {
    const findProductById = await this.productRepository.findOne({
      where: { id: dto.id },
      relations: ['tags', 'images', 'categories'],
    })

    if (!findProductById)
      throw new NotFoundException(
        `Продукт с идентификатором ${dto.id} не найден`,
      )

    return findProductById
  }

  async updateProduct(dto: UpdateProductDTO): Promise<ProductResponse> {
    const updatesTags = await this.tagService.findTagsById(dto.tagIds)
    const updatesImages = await this.imageService.findImagesById(dto.imageIds)
    const updatesCategories = await this.categoryService.findCategoriesById(
      dto.categoryIds,
    )

    const existProduct = await this.productRepository.findOne({
      where: { id: dto.id },
      relations: ['tags', 'images', 'categories'],
    })

    if (!existProduct)
      throw new NotFoundException(
        `Продукт с идентификатором ${dto.id} данными не найден`,
      )

    const updatedProduct = await this.productRepository.save({
      ...existProduct,
      title: dto.title,
      description: dto.description,
      discount: dto.discount,
      price: dto.price,
      rating: 5,
      tags: updatesTags,
      images: updatesImages,
      categories: updatesCategories,
      brand: dto.brand,
    })

    const responseProduct: ProductResponse = {
      id: updatedProduct.id,
      title: updatedProduct.title,
      description: updatedProduct.description,
      price: updatedProduct.price,
      discount: updatedProduct.discount,
      rating: updatedProduct.rating,
      tags: updatedProduct.tags.map((tag) => tag),
      images: updatedProduct.images.map((image) => image),
      categories: updatedProduct.categories.map((category) => category),
      brand: updatedProduct.brand,
    }

    return responseProduct
  }

  async deleteProduct(dto: DeleteProductDTO): Promise<ProductResponseDelete> {
    const deleteResult = await this.productRepository.delete(dto.id)

    if (deleteResult.affected === 0) {
      throw new NotFoundException()
    }
    return {
      message: `Операция по удалению выполнена`,
    }
  }

  async saveImagesForProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product)
  }
}
