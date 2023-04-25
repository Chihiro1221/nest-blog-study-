import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function isConfirm(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Boolean(value === args.object[args.property + '_confirm'])
        },
      },
    })
  }
}
