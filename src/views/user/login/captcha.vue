<template>
  <el-dialog
      v-model="state.popoverVisible"
      :show-close="false"
      align-center
      style="display: flex; align-items: center; justify-content: center; height: 0; width: 0"
  >
    <gocaptcha-slide
        :data="handler.data"
        :scope="0"
        :events="{
        close: handler.closeEvent,
        refresh: handler.refreshEvent,
        confirm: handler.confirmEvent,
      }"
        ref="domRef"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import {useHandler} from '@/utils/useSlideHandler.ts'
import {ref, watch} from 'vue'

const emit = defineEmits(['onSuccess'])

const domRef = ref(null)
const handler = useHandler(domRef, {
  getApi: '/api/captcha',
  checkApi: '/api/captcha'
})
const state = handler.state
watch(() => state.type, (n) => {
      console.log(n)
      if (n === "success") {
        emit("onSuccess")
        state.type = "default"
      }
    }
)
const open = () => {
  state.popoverVisible = true
}
const close = () => {
  state.popoverVisible = false
}

defineExpose({open, close})

</script>
<style></style>
