import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): any {
    const messages = {}
    validationErrors.forEach((error) => {
      messages[error.property] = Object.values(error.constraints)[0]
    })
    throw new HttpException(
      {
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: messages,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
  }
}
