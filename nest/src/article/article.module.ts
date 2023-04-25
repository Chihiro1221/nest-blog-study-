import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { JwtStrategy } from '@/auth/strategy/jwt.strategy'

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, JwtStrategy],
})
export class ArticleModule {}
