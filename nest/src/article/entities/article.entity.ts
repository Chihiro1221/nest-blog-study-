import { article } from '@prisma/client'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'

export class ArticleEntity {
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
  createdAt: string
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
  updatedAt: string
  constructor(options: Partial<article>) {
    Object.assign(this, options)
  }
}
