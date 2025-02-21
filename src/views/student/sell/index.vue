<template>
  <div class="w-full flex justify-center mt-10">
    <div class="rounded-2xl p-6" style="width: 50%">
      <!-- 步骤条 -->
      <el-steps
        :active="recycleData.status"
        finish-status="success"
        class="mt-10 mb-30"
        align-center
      >
        <el-step title="完善信息" />
        <el-step title="收书员接单" />
        <el-step title="收书员上门" />
        <el-step title="账单结算" />
      </el-steps>
      <Form v-if="step === 0"></Form>
      <Wait v-if="step === 1"></Wait>
      <OnDoor v-if="step === 2"></OnDoor>
      <SettleAccount v-if="step === 3" :recycle="recycleData"></SettleAccount>
      <!-- <Done :closeSale="() => closeSale()" v-if="step === 4"></Done> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Form from './form.vue'
import Wait from './wait.vue'
import OnDoor from './ondoor.vue'
import SettleAccount from './settleAccount.vue'
import { recycle } from '@/apis'
import { closeLoading, startLoading } from '@/utils/loading'
import { ElNotification } from 'element-plus'
import { useRequest } from 'vue-hooks-plus'

// import Done from './done.vue'
// 步骤进度
const step = computed(() => {
  return recycleData.value.status || 0
})

const recycleData = ref({
  status: 0,
  receiver_name: '',
  receiver_phone: '',
  weight: 0,
  money: ''
})

useRequest(() => recycle.getRecycleOrder(), {
  onBefore: () => startLoading(),
  onSuccess(res: any) {
    if (res.code !== 200) {
      ElNotification.error(res.msg)
      return
    }
    recycleData.value = res.data
  },
  onError(e) {
    ElNotification.error('获取订单状态失败，请重试')
  },
  onFinally: () => closeLoading()
})
</script>
