import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from 'src/entities/tag.entity'
import { In, Repository } from 'typeorm'
import { CreateTagDTO, DeleteTagDTO, GetOneTagDTO, UpdateTagDTO } from './dto'
import { ProductTagDelete, ProductTagResponse } from './response'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ProductService } from '../product/product.service'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async createTag(dto: CreateTagDTO): Promise<ProductTagResponse> {
    const { name, value, productId } = dto

    const checkedData = await this.tagRepository.findOne({
      where: { name: name, value: value },
    })

    const existProduct = await this.productService.getProductById({
      id: productId,
    })

    if (checkedData) {
      throw new NotFoundException('Тег с такими данными уже существует.')
    }

    if (!existProduct)
      throw new NotFoundException(
        `Продукта с идентификатором = ${productId} ге существует`,
      )

    const newTag = this.tagRepository.create({
      name: name,
      value: value,
      products: [existProduct],
    })

    return await this.tagRepository.save(newTag)
  }

  async getAllTags(): Promise<ProductTagResponse[]> {
    const findAllTags = this.tagRepository.find()
    return findAllTags
  }

  async getTagById(dto: GetOneTagDTO): Promise<ProductTagResponse> {
    const { id } = dto

    const findTag = await this.tagRepository.findOne({ where: { id: id } })

    if (!findTag)
      throw new NotFoundException(`Тег с идентификатором ${id} не найден`)

    return findTag
  }

  async findTagsById(ids: number[]): Promise<ProductTagResponse[]> {
    return this.tagRepository.find({ where: { id: In(ids) } })
  }

  async updateTag(dto: UpdateTagDTO): Promise<ProductTagResponse> {
    const { id, name, value } = dto

    const findTag = await this.tagRepository.findOne({ where: { id: id } })

    if (!findTag)
      throw new NotFoundException(`Тег с идентификатором ${id} не найден`)

    const updatedTag = this.tagRepository.save({
      id: findTag.id,
      name: name,
      value: value,
    })

    return updatedTag
  }

  async deleteTag(dto: DeleteTagDTO): Promise<ProductTagDelete> {
    const { id } = dto

    const findTag = await this.tagRepository.delete(id)

    if (findTag.affected === 0) {
      throw new NotFoundException(`Тег с идентификатором ${dto.id} не найден`)
    }
    return {
      message: `Тег был успешно удалён`,
    }
  }
}
