<template>
  <div class="flex flex-row w-full">
    <div class="flex flex-col">
      <div class="p-100 pb-2 ml-100 mr-100">
        <el-icon size="50"><UserFilled /></el-icon>
      </div>
      <div class="text-l text-center font-bold w-full">{{ userInfo.name }}</div>
      <div class="text-l text-center font-bold w-full">信誉分:{{ userInfo.reputation }}</div>
    </div>

    <div class="flex flex-grow flex-col w-full">
      <el-card class="w-3/5 mt-30">
        <el-descriptions title="用户信息" :column="1" size="large">
          <el-descriptions-item label="学号">{{ userInfo.studentID }}</el-descriptions-item>
          <el-descriptions-item label="联系方式">{{ userInfo.phone }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="w-3/5 mt-30">
        <el-descriptions title="我的账户" :column="1" size="large"> </el-descriptions>
        <div class="w-100 flex justify-between items-center">
          <span class="text-center">{{ moneyVisible ? userInfo.balance : '******' }}</span>
          <el-icon
            class="ml-5 cursor-pointer select-none"
            @click="() => (moneyVisible = !moneyVisible)"
          >
            <Key />
          </el-icon>
        </div>
      </el-card>
      <el-card class="w-3/5 mt-30 overflow-auto mb-25">
        <div class="el-descriptions__title">收支账单</div>
        <div v-for="(b, index) in bills" :key="index" class="w-full">
          <div class="flex flex-grow justify-between ml-10 mt-8 w-full">
            <div class="flex flex-col">
              <div class="text-sm font-bold">
                {{ Number(b.money) > 0 ? `收入` : '支出' }}
              </div>
              <div class="text-xs font-thin">{{ b.date }}</div>
            </div>
            <div class="text-xl font-bold mr-10 flex items-end">￥{{ b.money }}</div>
          </div>
          <hr
            class="boder my-4 border-gray-400"
            v-if="index + 1 != bills?.length"
            style="border-top-width: 1.5px"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserAPI } from '@/apis'
import { closeLoading, startLoading } from '@/utils/loading'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRequest } from 'vue-hooks-plus'

const moneyVisible = ref<boolean>(false)
const userInfo = reactive({
  studentID: '',
  name: '',
  phone: '',
  reputation: 0,
  balance: ''
})
type bill = {
  money: string
  date: string
}
const bills = ref<bill[]>()
useRequest(() => UserAPI.info(), {
  onBefore: () => startLoading(),
  onSuccess(res: any) {
    if (res.code !== 200) {
      ElNotification.error(res.msg)
      return
    }
    const data = res.data
    userInfo.studentID = data.student_id
    userInfo.name = data.name
    userInfo.phone = data.phone
    userInfo.balance = data.balance
    userInfo.reputation = data.reputation
    bills.value = data.bill
  },
  onError(e) {
    ElNotification.error('获取个人信息失败，请重试')
    console.log('获取个人信息失败', e)
  },
  onFinally: () => closeLoading()
})
</script>

<style scoped></style>
