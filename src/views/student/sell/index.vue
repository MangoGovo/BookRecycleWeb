<template>
  <div class="w-full flex justify-center mt-10">
    <div class="rounded-2xl p-6" style="width: 50%">
      <!-- 步骤条 -->
      <el-steps :active="step" finish-status="success" class="mt-10 mb-30" align-center>
        <el-step title="完善信息" @click="step = 0" class="cursor-pointer" />
        <el-step title="收书员接单" @click="step = 1" class="cursor-pointer" />
        <el-step title="收书员上门" @click="step = 2" class="cursor-pointer" />
        <el-step title="账单结算" @click="step = 3" class="cursor-pointer" />
      </el-steps>
      <Form v-if="step === 0"></Form>
      <Wait v-if="step === 1"></Wait>
      <OnDoor v-if="step === 2"></OnDoor>
      <SettleAccount v-if="step === 3"></SettleAccount>
      <Done :closeSale="() => closeSale()" v-if="step === 4"></Done>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from './form.vue'
import Wait from './wait.vue'
import OnDoor from './ondoor.vue'
import SettleAccount from './settleAccount.vue'
import Done from './done.vue'
// 步骤进度
const step = ref(4)
const closeSale = () => {
  step.value = 0
}
</script>
