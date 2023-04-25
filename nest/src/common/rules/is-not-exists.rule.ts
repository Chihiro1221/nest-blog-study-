import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsNotExists(tableName: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [tableName],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prisma = new PrismaClient()
          const user = await prisma[tableName].findFirst({
            where: {
              [args.property]: value,
            },
          })
          return Boolean(user)
        },
      },
    })
  }
}
