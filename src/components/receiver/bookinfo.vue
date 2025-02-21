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
          <!-- <p class="text-xl font-semibold my=10">书籍名称：{{ bookInfo?.name }}</p> -->
          <p class="text-xl my-5">用户名：{{ bookInfo?.seller_name }}</p>
          <p class="text-xl my-5">预估重量：{{ bookInfo?.weight }}</p>
          <p class="text-xl my-5">上门地址：{{ bookInfo?.address }}</p>
          <p class="text-xl my-5">备注：{{ bookInfo?.note }}</p>
          <div class="flex justify-center mt-20">
            <el-button @click="takeOrder" size="large" type="primary" plain>我要接单</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog, ElButton, ElNotification } from 'element-plus'
import type { oldBook } from '@/types/oldbook'
import { useDefaultRequest } from '@/utils/request'
import { ReceiverAPI } from '@/apis'
import { BookInfo } from '..'
import router from '@/router'

const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}

const takeOrder = () => {
  const id = props.bookInfo?.id
  if (id)
    useDefaultRequest(ReceiverAPI.takeOrder({ id }), () => {
      ElNotification.success('接单成功')
      router.push('/receiver/check')
    })
}

const props = defineProps<{
  bookInfo: oldBook | undefined
}>()

defineExpose({
  open
})
</script>

<style scoped>
/* 你可以根据需要调整组件的样式 */
</style>