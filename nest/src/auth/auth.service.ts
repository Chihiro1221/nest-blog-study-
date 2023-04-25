import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const user = await this.prismaService.user.create({
      data: { name: dto.name, password: await hash(dto.password) },
    })
    return this.token(user)
  }

  private async token({ name, id: sub }: user) {
    return {
      token: await this.jwtService.signAsync({
        name,
        sub,
      }),
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        name: dto.name,
      },
    })

    const isValid = await verify(user.password, dto.password)
    if (!isValid) {
      throw new BadRequestException('密码错误')
    }
    return this.token(user)
  }
}
