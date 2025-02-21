import { defineStore } from 'pinia'
import { ref } from 'vue'

const useTempStore = defineStore(
  'temp',
  () => {
    type pushContactMsg = {
      bookname: string
      receiver_id: number
    }
    const pushWithContactor = ref<pushContactMsg | null>(null)
    const setContactor = (bookname: string, receiver_id: number) => {
      pushWithContactor.value = {
        bookname,
        receiver_id
      }
    }
    const clearContactor = () => {
      pushWithContactor.value = null
    }
    return {
      pushWithContactor,
      setContactor,
      clearContactor
    }
  },
  {}
)

export default useTempStore
