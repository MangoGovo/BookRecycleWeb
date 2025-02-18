<template>
  <div class="w-full">
    <el-container>
      <el-header class="my-20">
        <!-- 二级导航栏 -->
        <div class="w-full mx-10 px-50 flex flex-row justify-between items-center">
          <el-tooltip content="查看账单" placement="bottom-start">
            <div
              class="btn btn-ghost h-50 w-50 text-xl dark:hover:bg-customGray_more_shallow"
              @click="showBill"
            >
              <el-icon size="40"><Tickets /></el-icon>
            </div>
          </el-tooltip>
          <el-input style="width: 50%" size="large" placeholder="搜索书籍" :prefix-icon="Search">
            <template #suffix>
              <el-button :icon="Search" circle />
            </template>
          </el-input>
          <el-button type="primary" plain size="large" @click="uploadBook">上传书籍</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="p-6 mx-100">
          <el-row>
            <el-col v-for="(book, index) in books" :span="6">
              <el-card
                shadow="hover"
                class="rounded-lg m-10 overflow-hidden border border-gray-200"
              >
                <img
                  :src="book.cover_url"
                  alt="这里本应该是图片"
                  class="w-full h-200 object-cover rounded-t-lg select-none"
                  draggable="false"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold truncate">{{ book.title }}</h3>
                  <p class="text-xl text-red-500 font-bold mt-2">￥{{ book.price }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const showBill = () => {}
const uploadBook = () => {}
/**
 * TODO
 * 分页查询
 * 查询参数
 *
 */
type book = {
  id: number
  title: string
  cover_url: string
  subject: string
  print_edition: string
  publisher: string
  intactness: string // 完好程度
  remark: string
  price: string
}
const books = reactive<book[]>([
  {
    id: 12038102893,
    title: 'Vue.js 进阶指南',
    cover_url: 'https://cdn.pixabay.com/photo/2017/10/15/09/06/book-2852903_640.jpg',
    subject: '原神',
    print_edition: '2001.12',
    publisher: '浙江工业大学',
    intactness: '99新',
    remark: 'beizhu',
    price: '68'
  }
])
</script>
