import { defineStore } from 'pinia'
import useDarkModeStore from './service/darkStore'
import useLoginStore from './service/loginStore'
import useTempStore from './service/tempStore'
export const useMainStore = defineStore(
  'main',
  () => {
    return {
      useDarkModeStore,
      useLoginStore,
      useTempStore
    }
  },
  { persist: true }
)
