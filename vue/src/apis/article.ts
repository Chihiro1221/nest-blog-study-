import { http } from '@/plugins/axios'

export interface ArticleParams {
  page: number
  category?: number
}

export interface createArticle {
  title: string
  content: string
  categoryId: number
}

export function getArticleList(params: ArticleParams) {
  const url =
    `article?` +
    Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  return http.request<ArticleModel, ResponsePageResult<ArticleModel>>({
    url,
  })
}

export function getArticle(id: number) {
  return http
    .request<ArticleModel>({
      url: `article/${id}`,
    })
    .then((res) => res.data)
}

export function createArticle(form: createArticle) {
  return http.request({
    url: 'article',
    method: 'POST',
    data: form,
  })
}

export function updateArticle(data: ArticleModel) {
  return http.request({
    url: `article/${data.id}`,
    method: 'PATCH',
    data,
  })
}
