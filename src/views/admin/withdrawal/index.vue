<template>
  <div class="p-4 w-full flex-grow flex flex-col">
    <div class="overflow-x-auto shadow-md rounded-lg m-10">
      <el-table :data="withdrawalList" border>
        <el-table-column prop="ID" label="流水号" width="80" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="account" label="提现账户" />
        <el-table-column prop="money" label="提现金额" width="100" />
        <el-table-column prop="CreatedAt" label="创建时间" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import type { book } from '@/types/book'
import { useDefaultRequest } from '@/utils/request'
import { AdminAPI } from '@/apis'

const withdrawalList = ref<book[]>()
useDefaultRequest(AdminAPI.getWithdrawalList(), (res: any) => {
  console.log(res.data)
  withdrawalList.value = res.data
})
</script>

<style scoped></style>
