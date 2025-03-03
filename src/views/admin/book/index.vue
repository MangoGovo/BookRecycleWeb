<template>
  <div class="p-4 w-full flex-grow flex flex-col">
    <div class="overflow-x-auto shadow-md rounded-lg m-10">
      <el-table :data="bookList" border>
        <el-table-column prop="name" label="书名" />
        <el-table-column prop="author" label="作者" />
        <el-table-column prop="publisher" label="出版商" />
        <el-table-column prop="completeness" label="成色" />
        <el-table-column prop="price" label="价格" />
        <el-table-column label="操作">
          <template v-slot="scope">
            <div class="flex flex-row">
              <el-button @click="handlePass(scope.row)" type="success" plain> 通过 </el-button>
              <el-button @click="handleDeny(scope.row)" type="danger"> 撤销 </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTable, ElTableColumn, ElTag, ElButton } from 'element-plus'
import type { book } from '@/types/book'
import { useDefaultRequest } from '@/utils/request'
import { AdminAPI } from '@/apis'

const bookList = ref<book[]>()

useDefaultRequest(AdminAPI.getBookReviewList(), (res: any) => {
  bookList.value = res.data.review_book_list
})

const handleDeny = (row: book) => {
  console.log('撤销', row)
}

const handlePass = (row: book) => {
  console.log('通过', row)
}
</script>

<style scoped></style>
