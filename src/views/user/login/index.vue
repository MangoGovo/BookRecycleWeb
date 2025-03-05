<template>
  <div class="flex-grow flex justify-evenly gap-70">
    <Logo/>
    <Captcha ref="captcha" @onSuccess="login"/>
    <div class="flex justify-center items-center">
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="flex justify-start items-center w-1/2">
      <div
          class="bg-base-200 dark:bg-customGray shadow-lg h-auto p-20 rounded-3xl w-10/12 items-center justify-center hover:shadow-2xl hover:-translate-y-2 transform duration-700"
      >
        <div class="flex justify-center items-center mt-15">
          <span class="text-4xl font-medium my-10">旧书回收系统</span>
        </div>
        <div class="flex justify-center gap-30 flex-col h-auto p-40">
          <div class="w-full">
            <div class="text-xl mb-5">账号</div>
            <el-input
                class="h-45 my-10 dark:rounded dark:bg-customGray_shallow"
                :placeholder="placeholder + '账号'"
                v-model="username"
            ></el-input>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">密码</div>
            <el-input
                class="h-45 mt-10 dark:rounded dark:bg-customGray_shallow"
                :placeholder="placeholder + '密码'"
                v-model="password"
                @keyup.enter="send"
                type="password"
            ></el-input>
            <el-link type="primary" class="my-10 float-right" @click="forget">忘记密码</el-link>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">登陆身份</div>
            <el-radio-group v-model="loginType" class="text-center w-full">
              <el-radio
                  :border="true"
                  v-for="user in userTypes"
                  :key="user.value"
                  :value="user.value"
              >{{ user.msg }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="flex justify-evenly items-center mb-20">
          <el-button
              class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800"
              size="large"
              type="success"
              plain
              @click="send"
          >登陆
          </el-button>
          <el-button
              class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800"
              size="large"
              type="primary"
              plain
              @click="register"
          >注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ElMessageBox, ElNotification} from 'element-plus'
import {computed, ref} from 'vue'
import {UserAPI} from '@/apis'
import UserType from '@/types/enums/userType'
import router from '@/router'
import {useMainStore} from '@/stores'
import Captcha from '@/views/user/login/captcha.vue'
import {useDefaultRequest} from '@/utils/request.ts'

const password = ref<string>('')
const username = ref<string>('')
const loginType = ref<number>(UserType.Student)
const loginStore = useMainStore().useLoginStore()
const userTypes = [
  {
    value: UserType.Student,
    msg: '学生'
  },
  {
    value: UserType.Receiver,
    msg: '收书员'
  },
  {
    value: UserType.Admin,
    msg: '管理员'
  }
]

// onMounted(() => {
//   console.log('清空登陆信息')
//   loginStore.clearLoginData()
// })

const placeholder = computed(() => {
  return userTypes.find((e) => e.value === loginType.value)?.msg || ''
})
const captcha = ref()
const login = () => {
  const t = loginType.value
  useDefaultRequest(
      UserAPI.login({
        username: username.value,
        password: password.value,
        type: t
      }),
      (res: any) => {
        const data = res.data
        console.log(data)
        ElNotification.success('登陆成功')
        loginStore.setLoginData(data.user_id, true, data.activated, data.token, t)
        router.push('/')
      }
  )
}

const send = () => {
  captcha.value?.open()

}

const forget = () => {
  // router.push('/forget')
  ElMessageBox.alert('忘记密码请联系管理员找回密码', '忘记密码')
}

const register = () => {
  router.push('/register')
}
</script>

<style scoped>
:deep(.el-input__wrapper) {
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

:deep(.el-dialog) {
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-bg-opacity, 1)));
}
</style>
