import { IsNotEmpty } from 'class-validator'
import { isConfirm } from '@/common/rules/is-confirm.rule'
import { IsExists } from '@/common/rules/is-exists.rule'

export class RegisterDto {
  @IsExists('user', { message: '用户已注册' })
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string

  @IsNotEmpty({ message: '密码不能为空' })
  @isConfirm({ message: '两次密码不一致' })
  password: string

  password_confirm: string
}
