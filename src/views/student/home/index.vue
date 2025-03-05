<template>
  <div class="flex flex-col flex-grow justify-center items-center">
    <div class="w-4/5">
      <el-row :gutter="100" justify="center">
        <el-col :span="10">
          <el-card class="cursor-pointer" @click="sell" shadow="hover">
            <div
              style="writing-mode: vertical-rl; height: 75%"
              class="select-none flex items-center justify-center py-180 text-4xl w-full"
            >
              我要卖书
              <el-icon class="mt-20"><Box /></el-icon>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card class="cursor-pointer" @click="market" shadow="hover">
            <div
              style="writing-mode: vertical-rl; height: 75%"
              class="select-none flex items-center justify-center py-180 text-4xl w-full"
            >
              旧书再利用
              <el-icon class="mt-20"><Money /></el-icon>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { Box, Money } from '@element-plus/icons-vue'

const sell = () => {
  router.push('/student/sell')
}

const market = () => {
  router.push('/student/market')
}
</script>

<style scoped></style>
