<template>
  <el-container class="">
    <el-aside width="250px">
      <el-scrollbar>
        <el-menu
          :default-active="String(activeChat)"
          @select="handleChatSelect"
          :collapse="false"
          v-for="(msg, other) in computedMaps.msgMap"
        >
          <el-menu-item :index="String(other)" :key="other">{{
            computedMaps.nameMap[other]
          }}</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 右侧聊天内容 -->
    <el-main class="chat-main">
      <div class="chat-header">
        <span class="font-bold text-xl">{{ currentChatName }}</span>
      </div>
      <el-scrollbar class="">
        <div v-for="msg in computedMaps.msgMap[activeChat || 0]" :key="msg.id" class="message">
          <p :class="msg.sender === userID ? 'text-right' : 'text-left'">
            <span class="message-sender"
              >{{ msg.sender === userID ? '我' : msg.sender_name }}:
            </span>
            <span>{{ msg.content }}</span>
          </p>
        </div>
      </el-scrollbar>

      <!-- 输入框和发送按钮 -->
      <div class="chat-input gap-20">
        <el-input
          v-model="newMessage"
          placeholder="请键入文本..."
          @keyup.enter="send"
          class="w-full"
          size="large"
          maxlength="100"
          show-word-limit
        />

        <el-button @click="send" type="primary" size="large" class="ml-2">Send</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useWebSocket } from '@/utils/websocket'
import type { messageResp } from '@/types/message'
import { useMainStore } from '@/stores'
import { Message, Position } from '@element-plus/icons-vue'

const { sendMessage, messageList } = useWebSocket()
const loginStore = useMainStore().useLoginStore()
const userID = loginStore.userID
const computedMaps = computed(() => {
  let msgMap: { [key: number]: messageResp[] } = {}
  let nameMap: { [key: number]: string } = {}
  messageList.value?.forEach((e) => {
    nameMap[e.sender] = e.sender_name
    nameMap[e.receiver] = e.receiver_name
    const other = userID === e.sender ? e.receiver : e.sender
    if (!(other in msgMap)) {
      msgMap[other] = []
    }
    msgMap[other].push(e)
  })
  return { msgMap, nameMap }
})
// const { msgMap, nameMap } = computedMaps.value
const activeChat = ref<number>() // 当前活跃的聊天对象
const currentChatName = ref('') // 当前聊天对象的名称
const newMessage = ref('') // 新消息

// 处理聊天对象选择
const handleChatSelect = (index: number) => {
  const i = Number(index)
  activeChat.value = i
}

watch([activeChat, computedMaps], () => {
  if (activeChat.value) currentChatName.value = computedMaps.value.nameMap[activeChat.value]
})

// 发送消息
const send = () => {
  console.log(activeChat.value)
  if (activeChat.value) {
    sendMessage({
      receiver: activeChat.value,
      content: newMessage.value
    })
  }
  newMessage.value = ''
}

// 处理跳转自动发信息
const tempStore = useMainStore().useTempStore()
onMounted(() =>
  (async () => {
    const contactor = tempStore.pushWithContactor
    if (contactor !== null) {
      handleChatSelect(contactor.receiver_id)
      await sendMessage({
        content: `你好, 我对你的书《${contactor.bookname}》很感兴趣, 方便聊一聊吗`,
        receiver: contactor.receiver_id
      })
      tempStore.clearContactor()
    }
  })()
)
onUnmounted(() => {
  messageList.value = []
})
</script>

<style scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}
:deep(.el-menu--vertical) {
  height: 100%;
}
.chat-main {
  display: flex;
  flex-direction: column;
}

.chat-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>
