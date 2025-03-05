<template>
  <el-container>
    <el-aside width="100px">
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
          <div :class="['message-bubble', msg.sender === userID ? 'self' : 'other']">
            <div class="bubble-content">
              <span class="text-sm font-bold">{{
                msg.sender === userID ? '我' : msg.sender_name
              }}</span>
              <span style="font-size: 0.65rem" class="mx-5 font-thin">{{ msg.time }}</span>
              <div class="message-text">{{ msg.content }}</div>
            </div>
          </div>
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useWebSocket } from '@/utils/websocket'
import type { messageResp } from '@/types/message'
import { useMainStore } from '@/stores'

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

/* 添加气泡样式 */
.message {
  margin: 12px 0;
  display: flex;
}

.message-bubble {
  max-width: 70%;
  padding: 12px;
  border-radius: 8px;
  position: relative;
}

.self {
  background: #409eff;
  color: white;
  margin-left: auto;
  border-radius: 8px 8px 0 8px;
}

.other {
  background: #f0f2f5;
  color: #333;
  margin-right: auto;
  border-radius: 8px 8px 8px 0;
}

.message-text {
  word-break: break-word;
  line-height: 1.5;
}

/* 调整现有样式 */
.chat-main {
  height: calc(100vh - 8vh);
  padding: 20px;
}

.el-scrollbar {
  height: calc(100% - 80px);
}
</style>
