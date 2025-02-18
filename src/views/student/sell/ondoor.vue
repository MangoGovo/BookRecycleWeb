<template>
  <div class="flex flex-row flex-grow justify-center my-180 items-center gap-100">
    <div>
      <el-icon size="280">
        <Van />
      </el-icon>
    </div>
    <div class="flex flex-col">
      <div class="my-20 text-4xl mt-20">等待收书员上门...</div>
      <div class="text-3xl">
        联系方式:
        <a type="primary" href="#" class="hover:text-blue-400  underline" @click="copy">{{
          phone
        }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

const phone = ref<string>('13322222222')
const copy = async () => {
  await navigator.clipboard.writeText(phone.value)
  ElNotification.success('复制成功')
}
</script>
<style scoped></style>
