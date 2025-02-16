import UserType from '@/types/enums/userType'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLoginStore = defineStore(
  'login',
  () => {
    const isLogin = ref<boolean>(false)
    const isActivated = ref<boolean>(false)
    const token = ref<string>('')
    const userType = ref<UserType>(UserType.Student)

    const setLoginData = (
      _isLogin: boolean,
      _isActivated: boolean,
      _token: string,
      _userType: UserType
    ) => {
      isLogin.value = _isLogin
      isActivated.value = _isActivated
      token.value = _token
      userType.value = _userType
    }

    const clearLoginData = () => {
      isLogin.value = false
      isActivated.value = false
      token.value = ''
      userType.value = UserType.Student
    }

    const setIsActivated = (val: boolean) => (isActivated.value = val)

    return {
      isLogin,
      isActivated,
      token,
      userType,
      setLoginData,
      clearLoginData,
      setIsActivated
    }
  },
  { persist: true }
)

export default useLoginStore
