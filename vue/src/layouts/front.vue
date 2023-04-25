<script setup lang="ts">
import { isLogin } from '@/utils/helper'

const { all, categories } = useCategory()
const { params, changeCategory } = useArticle()
await all()
</script>

<template>
  <main class="front">
    <div class="logo" @click="changeCategory(null)">
      <img src="/images/logo.png" alt="" />
    </div>
    <nav>
      <div class="category-container">
        <section
          :class="{ active: params.category === category.id }"
          v-for="category of categories"
          :key="category.id"
          @click="changeCategory(category.id)">
          {{ category.title }}
        </section>
      </div>
      <div class="operation-container">
        <el-button type="primary" size="default" @click="$router.push({ name: 'article.create' })">发表文章</el-button>
        <el-button v-if="!isLogin()" type="success" size="default" @click="$router.push({ name: 'login' })"
          >管理员登录</el-button
        >
      </div>
    </nav>
    <router-view />
  </main>
</template>
<style lang="scss" scoped>
main.front {
  @apply md:w-[1000px] bg-white rounded shadow-md m-auto md:mt-5 p-4;
  .logo {
    @apply bg-gray-700 rounded pb-2 flex justify-center cursor-pointer;
  }

  nav {
    @apply flex-col md:flex-row flex justify-between items-center  mt-4;
    .category-container {
      @apply flex items-center gap-2 flex-wrap;
      section {
        @apply px-4 py-2 bg-slate-300 text-gray-700 rounded shadow-sm flex justify-center items-center hover:shadow-lg duration-300 cursor-pointer;
        &.active {
          @apply bg-gray-600 text-white;
        }
      }
    }
    .operation-container {
      @apply flex md:mt-0 mt-5;
    }
  }
}
</style>
