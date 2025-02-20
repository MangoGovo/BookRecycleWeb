<template>
  <el-dialog v-model="dialogVisible" title="我的订单" width="600" align-center @open="update">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="title" label="书籍标题" width="180" />
      <el-table-column prop="time" label="交易时间" width="180" />
      <el-table-column :formatter="statusFormatter" label="状态" />
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import { MarketAPI } from '@/apis'
import type { order } from '@/types/order'
import { closeLoading, startLoading } from '@/utils/loading'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import { useRequest } from 'vue-hooks-plus'
const dialogVisible = ref(false)
const orderList = ref<order[]>()
const page = ref<number>(1)

const statusMsg = ['正常', '投诉处理中', '投诉成功', '投诉失败']
const statusFormatter = (row: any) => {
  return statusMsg[row.status]
}
const update = () => {
  useRequest(
    () =>
      MarketAPI.orders({
        page: page.value,
        size: 20
      }),
    {
      onBefore: () => startLoading(),
      onSuccess(res: any) {
        if (res.code !== 200) {
          ElNotification.error(res.msg)
          return
        }
        orderList.value = res.data
      },
      onError(e) {
        ElNotification.error('获取订单失败，请重试')
        console.log('获取订单失败', e)
      },
      onFinally: () => closeLoading()
    }
  )
}

const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}
defineExpose({ open, close })
</script>
