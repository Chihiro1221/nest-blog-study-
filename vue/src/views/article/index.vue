<script setup lang="ts">
const { all, articles, article, articleDialog, showArticle, params, changeCategory } = useArticle()
await all()
</script>

<template>
  <main>
    <template v-if="articles?.data?.length">
      <HdAnimateList tag="ul" :duration="1" :delay="0.1">
        <section v-for="(article, index) of articles?.data" :key="article.id" :data-index="index">
          <div @click="showArticle(article.id)">{{ article.title }}</div>
          <aside @click="changeCategory(article.categoryId)">{{ article.category.title }}</aside>
        </section>
      </HdAnimateList>
    </template>
    <el-empty v-else description="暂无文章" />
    <el-pagination
      v-model:current-page="params.page"
      class="pagination"
      @current-change="all"
      :page-size="articles?.meta.page_size"
      :total="articles?.meta.total"
      background>
      :pager-count="7">
    </el-pagination>
    <!-- 文章详情 -->
    <el-dialog v-model="articleDialog" width="90%">
      <template #header>
        <div class="dialog-title">
          <span>{{ article?.title }}</span>
          <el-button
            type="danger"
            size="small"
            @click="$router.push({ name: 'article.update', params: { id: article?.id } })"
            >编辑</el-button
          >
        </div>
        <time> 发表时间:{{ article?.createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 更新时间:{{ article?.updatedAt }} </time>
      </template>
      <div class="article-container">
        <div v-html="article?.content"></div>
      </div>
    </el-dialog>
  </main>
</template>

<style lang="scss" scoped>
main {
  @apply mt-8;
  time {
    @apply mt-2 block text-sm text-gray-500;
  }
  section {
    @apply py-2 px-4 flex justify-between items-center bg-slate-200 text-gray-700 mb-2 rounded shadow;
    div {
      @apply cursor-pointer;
    }

    aside {
      @apply text-xs cursor-pointer hidden md:block;
    }
  }

  .pagination {
    @apply mt-4;
    :deep(.el-pagination__jump) {
      @apply hidden md:block;
    }
    :deep(.el-pagination__rightwrapper) {
      @apply ml-4 md:ml-0;
    }
  }

  .dialog-title {
    @apply text-2xl font-bold text-gray-600 flex items-center gap-4;
  }

  .article-container {
    div {
      @apply text-lg text-gray-600;
    }
  }
}
</style>
