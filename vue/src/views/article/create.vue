<script setup lang="ts">
import WangEditor from '@/components/hd/wangEditor.vue'
const { all, categories } = useCategory()
await all()
const form = reactive({
  title: '',
  content: '',
  categoryId: categories.value?.[0].id ?? 0,
})
const { add } = useArticle()
const router = useRouter()
const onSubmit = async () => {
  await add(form)
  router.push('/')
}
</script>

<template>
  <div class="create-container">
    <el-input class="mb-2" v-model="form.title" placeholder="请输入标题" size="large" clearable />
    <el-select class="mb-2" v-model="form.categoryId" value-key="id" placeholder="请选择栏目" filterable>
      <el-option v-for="category in categories" :key="category.id" :label="category.title" :value="category.id">
      </el-option>
    </el-select>
    <WangEditor v-model="form.content" :height="500" />
    <el-button class="mt-4" type="primary" size="default" @click="onSubmit">保存提交</el-button>
  </div>
</template>

<style scoped lang="scss">
.create-container {
  @apply mt-4;
}
</style>
