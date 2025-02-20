<template>
  <div class="flex flex-grow  bg-red-500">
    <!-- 联系人 -->
    <div class="w-1/6 flex h-full flex-col bg-white overflow-y-auto gap-10 p-10">
      <el-card v-for="f in friendList" :key="f.id">
        <p>{{ f.name }}</p>
      </el-card>
    </div>
    <!-- <div class="flex-1 bg-black"></div> -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

type friend = {
  id: number
  name: string
}
const friendList = ref<friend[]>([
  {
    id: 1,
    name: '111'
  },
  {
    id: 1,
    name: '111'
  },
  {
    id: 1,
    name: '111'
  }
])
onMounted(() => {
  for (let i = 0; i < 100; i++) {
    friendList.value?.push({
      id: i,
      name: '111'
    })
  }
})
</script>
