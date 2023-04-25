import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prismaService.category.create({
      data: createCategoryDto,
    })
    return category
  }

  async findAll() {
    const articles = await this.prismaService.category.findMany()
    return articles
  }

  async findOne(id: number) {
    const article = await this.prismaService.category.findFirst({
      where: { id },
    })
    return article
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const article = await this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    })
    return article
  }

  async remove(id: number) {
    await this.prismaService.category.delete({
      where: { id },
    })
    return null
  }
}
