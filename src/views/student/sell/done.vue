<template>
  <div class="flex flex-row flex-grow justify-center my-180 items-center gap-100">
    <div>
      <el-icon size="280">
        <Document />
      </el-icon>
    </div>
    <div class="flex flex-col">
      <div class="my-10 text-3xl mt-20">回收成功</div>
      <div class="text-3xl">收益已经提入个人账户</div>
      <a
        class="text-2xl cursor-pointer mt-20 text-gray-500 underline select-none"
        @click="closeSale"
        >完成此次订单</a
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  closeSale: () => void // 定义接受的函数类型
}>()
</script>
