import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptors'
import Validate from './common/pipes/validate.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('api')
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  })
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(3000)
}
bootstrap()
