import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prismaService.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId,
      },
    })
    return article
  }

  async findAll(args: Record<string, any>) {
    const size = +this.configService.get('ARTICLE_PAGE_SIZE')
    const page = args.page ? +args.page : 1
    const articles = await this.prismaService.article.findMany({
      skip: (page - 1) * size,
      take: size,
      include: { category: true },
      where: {
        categoryId: args.category ? +args.category : void 0,
      },
    })
    const total = await this.prismaService.article.count({
      where: {
        categoryId: args.category ? +args.category : void 0,
      },
    })
    return {
      meta: {
        current_page: page,
        page_size: size,
        total,
        total_page: Math.ceil(total / size),
      },
      data: articles,
    }
  }

  async findOne(id: number) {
    const article = await this.prismaService.article.findFirst({
      where: {
        id,
      },
      include: { category: true },
    })
    return article
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prismaService.article.update({
      where: { id },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
      },
    })
    return article
  }

  async remove(id: number) {
    await this.prismaService.article.delete({
      where: { id },
    })
    return null
  }
}
