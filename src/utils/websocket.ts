import type { messageReq, messageResp } from '@/types/message'
import { onMounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useMainStore } from '@/stores'

const messageList = ref<messageResp[]>([])
const wsUrl = 'ws://localhost:8080/ws'

export const useWebSocket = () => {
  const loginStore = useMainStore().useLoginStore()
  const token = loginStore.token

  const socket = new WebSocket(`ws://localhost:8080/ws?token=${token}`)

  socket.onopen = () => {
    console.log('Connected to WebSocket server')
  }

  socket.onmessage = (event) => {
    const data: messageResp = JSON.parse(event.data.trim())
    if (data.receiver_name === '') {
      data.receiver_name = '账号未激活'
    }
    if (data.sender_name === '') {
      data.sender_name = '账号未激活'
    }
    messageList.value?.push(data)
    // console.log(messageList.value)
  }

  socket.onclose = () => {
    console.log('Disconnected from WebSocket server')
  }

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error)
  }
  const sendMessage = (msg: messageReq) => {
    console.log(msg)
    socket.send(JSON.stringify(msg))
  }

  return { sendMessage, messageList }
}
