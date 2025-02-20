<template>
  <el-dialog v-model="dialogVisible" title="书籍信息" width="50%">
    <div class="flex justify-center gap-20">
      <!-- 左侧固定大小图片 -->
      <div class="h-500 w-300 overflow-hidden rounded-lg">
        <img :src="bookInfo?.img" alt="Image" class="object-cover w-full h-full" />
      </div>
      <!-- 右侧显示信息 -->
      <div class="flex justify-between flex-grow">
        <el-card class="w-full" shadow="never">
          <p class="text-xl font-semibold my=10">书籍名称：{{ bookInfo?.name }}</p>
          <p class="text-xl my-5">适用课程：{{ bookInfo?.course }}</p>
          <p class="text-xl my-5">印刷版本：{{ bookInfo?.edition }}</p>
          <p class="text-xl my-5">出版商：{{ bookInfo?.publisher }}</p>
          <p class="text-xl my-5">完好程度：{{ bookInfo?.completeness }}</p>
          <p class="text-xl my-5">备注：{{ bookInfo?.note }}</p>
          <p class="text-2xl my-29 text-center font-semibold">售价：{{ bookInfo?.price }}元</p>
          <div class="flex justify-center">
            <el-button @click="contactOwner" size="large" type="primary" plain>联系主人</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { type book } from '@/types/book'

const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
  console.log('dialogVisible:', dialogVisible.value)
}

const contactOwner = () => {
  alert('联系主人')
}
defineProps<{
  bookInfo: book | undefined
}>()

defineExpose({
  open
})
</script>

<style scoped>
/* 你可以根据需要调整组件的样式 */
</style>
