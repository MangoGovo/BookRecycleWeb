<template>
  <div class="flex flex-row flex-grow justify-center my-180 items-center gap-100">
    <div>
      <el-icon size="280">
        <Money />
      </el-icon>
    </div>
    <div class="flex flex-col">
      <div class="my-20 font-bold text-3xl">账单审核结算中...</div>
      <div class="text-2xl">实际重量: {{ 1 }}kg</div>
      <div class="text-2xl">预计回收获得{{ 100 }}元</div>
      <div class="text-xl text-gray-500">(已扣除20%回收费用)</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  recycle: Object
}>()
</script>
