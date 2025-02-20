import UserType from '@/types/enums/userType'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLoginStore = defineStore(
  'login',
  () => {
    const isLogin = ref<boolean>(false)
    const isActivated = ref<boolean>(false)
    const token = ref<string>('')
    const userType = ref<UserType | null>(null)
    const userID = ref<number>()
    const setLoginData = (
      _userID: number,
      _isLogin: boolean,
      _isActivated: boolean,
      _token: string,
      _userType: UserType
    ) => {
      userID.value = _userID
      isLogin.value = _isLogin
      isActivated.value = _isActivated
      token.value = _token
      userType.value = _userType
    }

    const clearLoginData = () => {
      userID.value = 0
      isLogin.value = false
      isActivated.value = false
      token.value = ''
      userType.value = null
    }

    const setIsActivated = (val: boolean) => (isActivated.value = val)

    return {
      isLogin,
      isActivated,
      token,
      userType,
      userID,
      setLoginData,
      clearLoginData,
      setIsActivated
    }
  },
  { persist: true }
)

export default useLoginStore
