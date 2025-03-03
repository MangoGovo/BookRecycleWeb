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
            <el-button
              @click="contactOwner"
              size="large"
              type="primary"
              plain
              :disabled="loginStore.userID === bookInfo.user_id"
              >联系主人{{ loginStore.userID === bookInfo.user_id ? '(您自己)' : '' }}</el-button
            >
            <el-button
              @click="complaim"
              size="large"
              type="danger"
              plain
              v-if="loginStore.userID !== bookInfo.user_id"
              >举报</el-button
            >
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
import { useMainStore } from '@/stores'
import router from '@/router'

const dialogVisible = ref(false)
const tempStore = useMainStore().useTempStore()
const loginStore = useMainStore().useLoginStore()
const open = () => {
  dialogVisible.value = true
}

const contactOwner = () => {
  tempStore.setContactor(props.bookInfo.name, props.bookInfo.user_id)
  dialogVisible.value = false
  router.push('/student/chat')
}
const complaim = () => {
  // TODO 举报
}
const props = defineProps<{
  bookInfo: book
}>()

defineExpose({
  open
})
</script>

<style scoped>
/* 你可以根据需要调整组件的样式 */
</style>
