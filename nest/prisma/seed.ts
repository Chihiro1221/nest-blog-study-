import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import _ from 'lodash'
import { Random } from 'mockjs'

const prisma = new PrismaClient()

async function run() {
  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('youzhi..'),
      role: 'admin',
    },
  })

  for (let i = 0; i < 6; i++) {
    await prisma.category.create({
      data: {
        title: Random.ctitle(3, 6),
      },
    })
  }

  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(5, 20),
        content: Random.cparagraph(30, 50),
        categoryId: _.random(1, 6),
      },
    })
  }
}

run()
