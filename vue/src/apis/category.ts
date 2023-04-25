import { http } from '@/plugins/axios'

export function getAllCategory() {
  return http
    .request<CategoryModel[]>({
      url: 'category',
    })
    .then((res) => res.data)
}
