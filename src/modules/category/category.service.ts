import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/entities/category.entity'
import { In, Repository } from 'typeorm'
import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  GetOneCategoryDTO,
  UpdateCategoryDTO,
} from './dto'
import { ProductCategoryDelete, ProductCategoryResponse } from './response'
import { ProductService } from '../product/product.service'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async createCategory(
    dto: CreateCategoryDTO,
  ): Promise<ProductCategoryResponse> {
    const { name, productId } = dto

    const existCategory = await this.categoryRepository.findOne({
      where: { name: name },
    })

    const existProduct = await this.productService.getProductById({
      id: productId,
    })

    if (existCategory) {
      throw new NotFoundException(`Категория с именем ${name} уже существует`)
    }

    if (!existProduct) {
      throw new NotFoundException(`Продукта с id = ${productId} не существует`)
    }

    const newCategory = this.categoryRepository.create({
      name: name,
      products: [existProduct],
    })
    const savedCategory = await this.categoryRepository.save(newCategory)

    return {
      id: savedCategory.id,
      ...savedCategory,
    }
  }

  async getCategories(): Promise<ProductCategoryResponse[]> {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async updateCategory(
    dto: UpdateCategoryDTO,
  ): Promise<ProductCategoryResponse> {
    const { id, name } = dto

    const findCategory = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!findCategory) {
      throw new NotFoundException(`Категория с id = ${id} не найдена`)
    }

    const updatedCategory = await this.categoryRepository.save({
      id: findCategory.id,
      name: name,
    })

    return updatedCategory
  }

  async deleteCategory(dto: DeleteCategoryDTO): Promise<ProductCategoryDelete> {
    const deleteResult = await this.categoryRepository.delete(dto.id)

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Категория с id = ${dto.id} не найдена`)
    }
    return {
      message: `Операция по удалению выполнена`,
    }
  }

  async getCategoryById(
    dto: GetOneCategoryDTO,
  ): Promise<ProductCategoryResponse> {
    const findCategoryByID = await this.categoryRepository.findOne({
      where: { id: dto.id },
    })

    if (!findCategoryByID) {
      throw new NotFoundException(`Категория с id = ${dto.id} не найдена`)
    }

    return findCategoryByID
  }

  async findCategoriesById(ids: number[]): Promise<ProductCategoryResponse[]> {
    return this.categoryRepository.find({ where: { id: In(ids) } })
  }
}
