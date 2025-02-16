<template>
  <div class="flex-grow flex justify-evenly gap-70">
    <LoginActivateForm ref="messageFormRef" />
    <Logo />
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
              :placeholder="placeholder + '密码'"
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
                >{{ user.msg }}</el-radio
              >
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
            >登陆</el-button
          >
          <el-button
            class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800"
            size="large"
            type="primary"
            plain
            @click="register"
            >注册</el-button
          >

          <el-button type="primary" @click="openForm">打开表单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { LoginActivateForm } from '@/components'
import { loginAPI } from '@/apis'
import UserType from '@/types/enums/userType'
import router from '@/router'
import { useRequest } from 'vue-hooks-plus'
import { startLoading, closeLoading } from '@/utils/loading'
import { useMainStore } from '@/stores'
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

const placeholder = computed(() => {
  return userTypes.find((e) => e.value === loginType.value)?.msg || ''
})

const send = () => {
  const t = loginType.value
  useRequest(
    () =>
      loginAPI({
        username: username.value,
        password: password.value,
        type: t
      }),
    {
      onBefore: () => startLoading(),
      onSuccess(res: any) {
        if (res.code !== 200) {
          ElNotification.error(res.msg)
          return
        }
        const data = res.data
        console.log(data)
        ElNotification.success('登陆成功')
        loginStore.setLoginData(true, data.activated, data.token, t)
        router.push('/')
      },
      onError(e) {
        ElNotification.error('登录失败，请重试')
        console.log('登录失败', e)
      },
      onFinally: () => closeLoading()
    }
  )
}

const activate = () => {
  openForm()
}
const forget = () => {
  router.push('/forget')
}

const register = () => {
  router.push('/register')
}

const pass = () => {
  ElNotification.success('验证成功')
}
const verify = ref(false)

const messageFormRef = ref()

const openForm = () => {
  messageFormRef.value?.open()
}
</script>

<style scoped>
:deep(.el-input__wrapper) {
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

:deep(.el-dialog) {
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-bg-opacity, 1)));
}
</style>
