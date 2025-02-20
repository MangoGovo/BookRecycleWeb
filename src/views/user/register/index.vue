<template>
  <div class="flex-grow flex justify-evenly gap-70">
    <Logo />
    <div class="flex justify-center items-center">
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="flex justify-start items-center w-1/2">
      <div
        class="bg-base-200 dark:bg-customGray shadow-lg h-auto p-20 rounded-3xl w-10/12 items-center justify-center hover:shadow-2xl hover:-translate-y-2 transform duration-700"
      >
        <div class="flex justify-center items-center mt-15">
          <span class="text-4xl font-medium my-10">账号注册</span>
        </div>
        <div class="flex justify-center gap-30 flex-col h-auto p-40">
          <div class="w-full">
            <div class="text-xl mb-5">账号</div>
            <el-input
              class="h-45 my-10 dark:rounded dark:bg-customGray_shallow"
              :placeholder="accountPlaceholder + '账号'"
              v-model="formData.username"
            ></el-input>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">密码</div>
            <el-input
              class="h-45 mt-10 dark:rounded dark:bg-customGray_shallow"
              placeholder="密码"
              v-model="formData.password"
              type="password"
            ></el-input>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">重复密码</div>
            <el-input
              class="h-45 mt-10 dark:rounded dark:bg-customGray_shallow"
              placeholder="重复密码"
              v-model="formData.repeatPassword"
              @keyup.enter="register"
              type="password"
            ></el-input>
          </div>
          <div class="w-full" v-if="formData.userType == UserType.Admin">
            <div class="text-xl mb-5">管理员注册密码</div>
            <el-input
              class="h-45 mt-10 dark:rounded dark:bg-customGray_shallow"
              placeholder="管理员注册密码"
              v-model="formData.adminPassword"
              @keyup.enter="register"
              type="password"
            ></el-input>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">登陆身份</div>
            <el-radio-group v-model="formData.userType" class="text-center w-full">
              <el-radio :border="true" v-for="user in userTypes" :value="user.value">{{
                user.msg
              }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="flex justify-evenly items-center mb-20">
          <el-button
            class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800"
            size="large"
            type="success"
            plain
            @click="register"
            >注册</el-button
          >
          <el-button
            class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800"
            size="large"
            type="primary"
            plain
            @click="back"
            >返回登陆</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import UserType from '@/types/enums/userType'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { Logo } from '@/components'
import { useRequest } from 'vue-hooks-plus'
import { UserAPI } from '@/apis'
import { closeLoading, startLoading } from '@/utils/loading'
import { useMainStore } from '@/stores'

const loginStore = useMainStore().useLoginStore()
const formData = ref({
  username: '',
  password: '',
  repeatPassword: '',
  adminPassword: '',
  userType: UserType.Student
})

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

const accountPlaceholder = computed(() => {
  return userTypes.find((e) => e.value === formData.value.userType)?.msg || ''
})

const back = () => {
  router.push('/login')
}

const register = () => {
  useRequest(
    () =>
      UserAPI.register({
        username: formData.value.username,
        password: formData.value.password,
        type: formData.value.userType
      }),
    {
      onBefore: () => startLoading(),
      onSuccess(res: any) {
        if (res.code !== 200) {
          ElNotification.error(res.msg)
          return
        }
        const data = res.data
        ElNotification.success('注册成功，跳转到登录页面')
        router.push('/login')
      },
      onError(e) {
        ElNotification.error('注册失败，请重试')
        console.log('注册失败', e)
      },
      onFinally: () => closeLoading()
    }
  )
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
