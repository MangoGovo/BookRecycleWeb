<template>
  <div class="w-full">
    <BookInfo :bookInfo="selectedBook" ref="BookInfoView" />
    <Sell ref="SellDialog" />
    <StudentOrders ref="StudentOrdersDialog" />
    <el-container>
      <el-header class="my-20">
        <!-- 二级导航栏 -->
        <div class="w-full mx-10 px-50 flex flex-row justify-between items-center">
          <el-tooltip content="我的书籍" placement="bottom-start">
            <div
              class="btn btn-ghost h-50 w-50 text-xl dark:hover:bg-customGray_more_shallow"
              @click="StudentOrdersDialog?.open()"
            >
              <el-icon size="40">
                <Tickets />
              </el-icon>
            </div>
          </el-tooltip>
          <el-input
            style="width: 50%"
            size="large"
            v-model="searchContent"
            placeholder="搜索书籍"
            :prefix-icon="Search"
            @keyup.enter="send"
          >
            <template #suffix>
              <el-button :icon="Search" @click="send" circle />
            </template>
          </el-input>
          <el-button type="primary" plain size="large" @click="SellDialog?.open()"
            >上传书籍</el-button
          >
        </div>
      </el-header>
      <el-main>
        <div class="p-6 mx-100">
          <el-row>
            <el-col v-for="book in books" :key="book.id" :span="6">
              <el-card
                shadow="hover"
                class="rounded-lg m-10 overflow-hidden border border-gray-200"
                @click="showInfo(book)"
              >
                <img
                  :src="book.img"
                  alt="这里本应该是图片"
                  class="w-full h-200 object-cover rounded-t-lg select-none"
                  draggable="false"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold truncate">{{ book.name }}</h3>
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
import { onMounted, ref } from 'vue'
import { MarketAPI } from '@/apis'
import { closeLoading, startLoading } from '@/utils/loading'
import { ElNotification } from 'element-plus'
import { useRequest } from 'vue-hooks-plus'
import { useRoute } from 'vue-router'
import { type book } from '@/types/book'
import { BookInfo, StudentOrders } from '@/components'
import Sell from '@/components/student/sell.vue'
const selectedBook = ref<book | null>(null)
const BookInfoView = ref<InstanceType<typeof BookInfo> | null>(null)
const SellDialog = ref<InstanceType<typeof Sell> | null>(null)
const StudentOrdersDialog = ref<InstanceType<typeof StudentOrders> | null>(null)
const searchContent = ref<string>('')
/**
 * TODO
 * 分页查询
 * 查询参数
 *
 */
const send = () => {
  useRequest(
    () =>
      MarketAPI.products({
        search: searchContent.value
      }),
    {
      onBefore: () => startLoading(),
      onSuccess(res: any) {
        if (res.code !== 200) {
          ElNotification.error(res.msg)
          return
        }
        books.value = res.data.book_list
      },
      onError(e) {
        ElNotification.error('获取商品失败，请重试')
        console.log('获取商品失败', e)
      },
      onFinally: () => closeLoading()
    }
  )
}
onMounted(() => {
  send()
})

const showInfo = (book: book) => {
  selectedBook.value = book
  console.log(BookInfoView.value)
  BookInfoView.value?.open()
}

const books = ref<book[]>()
</script>
