import { defineStore } from 'pinia'
import useDarkModeStore from './service/darkStore'
import useLoginStore from './service/loginStore'
export const useMainStore = defineStore(
  'main',
  () => {
    return {
      useDarkModeStore,
      useLoginStore,
    }
  },
  { persist: true }
)
