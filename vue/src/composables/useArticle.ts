import { ArticleParams, createArticle, getArticle, getArticleList, updateArticle } from '@/apis/article'

const articles = ref<ResponsePageResult<ArticleModel>>()
const article = ref<ArticleModel>()
const articleDialog = ref(false)

let params = reactive<ArticleParams>({
  page: 1,
})
export default () => {
  const router = useRouter()
  const all = async (page?: number) => {
    if (page) params.page = page
    articles.value = await getArticleList(params)
  }

  const find = async (id: number) => {
    article.value = await getArticle(id)
  }

  const showArticle = async (id: number) => {
    articleDialog.value = !articleDialog.value
    await find(id)
  }

  const changeCategory = async (id: number | null) => {
    router.push('/')
    params.page = 1
    if (!id) delete params.category
    else params.category = id
    await all()
  }

  const add = async (form: createArticle) => {
    return await createArticle(form)
  }

  const update = async (form: ArticleModel) => {
    return await updateArticle(form)
  }

  return { articles, all, article, find, articleDialog, showArticle, params, changeCategory, add, update }
}
