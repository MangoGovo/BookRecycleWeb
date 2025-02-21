<template>
  <div class="flex mx-auto w-2/3 flex-col p-20 justify-between">
    <BookInfoDialog ref="dialog" :book-info="selectedBookinfo" />
    <!-- 表格部分 -->
    <el-table
      :data="orders"
      style="width: 100%"
      class="rounded-lg shadow-xl"
      @row-click="handleRowClick"
    >
      <el-table-column label="学生姓名" prop="seller_name" />
      <el-table-column label="上传时间" prop="created_at"></el-table-column>
      <el-table-column label="预估重量" prop="weight">
        <template #default="{ row }">
          <span>{{ row.weight }} kg</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElNotification, ElTable, ElTableColumn } from 'element-plus'
import type { oldBook } from '@/types/oldbook'
import BookInfoDialog from '@/components/receiver/bookinfo.vue'
import { useRequest } from 'vue-hooks-plus'
import { ReceiverAPI } from '@/apis'
import { closeLoading, startLoading } from '@/utils/loading'
import router from '@/router'
import { useDefaultRequest } from '@/utils/request'
const orders = ref<oldBook[]>()

const currentOrder = ref<oldBook | null>(null)
const dialog = ref()
const selectedBookinfo = ref<oldBook | undefined>()
const handleRowClick = (row: any) => {
  selectedBookinfo.value = row
  dialog.value?.open()
}
// 获取所有订单
useDefaultRequest(ReceiverAPI.orders(), (res: any) => {
  orders.value = res.data.order_list
})
// 获取当前接单
useDefaultRequest(ReceiverAPI.currentOrder(), (res: any) => {
  currentOrder.value = res.data
})
watch(currentOrder, () => {
  console.log(currentOrder.value)
  if (currentOrder.value) {
    router.push('/receiver/check')
  }
})
</script>

<style scoped>
/* 你可以根据需要在这里添加样式 */
</style>
