import type { messageReq, messageResp } from '@/types/message'
import { ref } from 'vue'
import { useMainStore } from '@/stores'

const messageList = ref<messageResp[]>([])
const wsUrl = 'ws://118.178.233.192:8080/ws'

export const useWebSocket = () => {
  const loginStore = useMainStore().useLoginStore()
  const token = loginStore.token

  const socket = new WebSocket(`${wsUrl}?token=${token}`)
  const isConnected = ref(false)
  socket.onopen = () => {
    console.log('Connected to WebSocket server')
    isConnected.value = true
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
    return new Promise<void>((resolve, reject) => {
      if (isConnected.value) {
        socket.send(JSON.stringify(msg))
        resolve()
      } else {
        socket.onopen = () => {
          socket.send(JSON.stringify(msg))
          isConnected.value = true
          resolve()
        }

        socket.onerror = (error) => {
          console.error('WebSocket Error during message sending:', error)
          reject(error)
        }
      }
    })
  }
  return { sendMessage, messageList }
}
