import { IsNotExists } from '@/common/rules/is-not-exists.rule'
import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotExists('user', { message: '用户不存在' })
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
