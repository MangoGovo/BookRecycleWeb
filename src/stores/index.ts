import { defineStore } from 'pinia'
import useDarkModeStore from './service/darkStore'

export const useMainStore = defineStore(
  'main',
  () => {
    return {
      useDarkModeStore,
    }
  },
  { persist: true }
)
