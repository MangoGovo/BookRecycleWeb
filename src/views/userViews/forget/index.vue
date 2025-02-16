<template>
  <div class="flex-grow flex justify-evenly gap-70">
    <Logo />
    <div class="flex justify-center items-center">
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="flex justify-start items-center w-1/2">
      <div class="bg-base-200 dark:bg-customGray
          shadow-lg h-auto p-20 rounded-3xl w-10/12 items-center justify-center
          hover:shadow-2xl hover:-translate-y-2 transform duration-700">
        <div class="flex justify-center items-center mt-15">
          <span class="text-3xl font-medium my-10">忘记密码</span>
        </div>
        <div class="flex justify-center gap-5 flex-col h-auto p-40">
          <div class="w-full">
            <div class="text-xl mb-5">账号</div>
            <el-input class="h-45 my-10 dark:rounded dark:bg-customGray_shallow" :placeholder="accountPlaceholder"
              v-model="username"></el-input>
          </div>

          <div class="w-full">
            <div class="text-xl mb-5">新密码</div>
            <el-input class="h-45 my-10 dark:rounded dark:bg-customGray_shallow" placeholder="新密码"
              v-model="username"></el-input>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">重复密码</div>
            <el-input class="h-45 my-10 dark:rounded dark:bg-customGray_shallow" placeholder="重复密码"
              v-model="username"></el-input>
          </div>
          <div class="w-full">
            <div class="text-xl mb-5">邮箱</div>
            <el-input class="h-45 my-10 dark:rounded dark:bg-customGray_shallow" placeholder="邮箱"
              v-model="username"></el-input>
          </div>
          <div class=" w-1/2">
            <div class="text-xl mb-5">验证码</div>
            <div class="flex items-center gap-4">
              <el-input class="h-45 my-10 dark:rounded dark:bg-customGray_shallow" placeholder="验证码"
                v-model="username"></el-input>
              <el-button class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800" size="large"
                type="info" plain @click="getVerifyCode">获取验证码</el-button>
            </div>
          </div>

        </div>
        <div class="flex justify-evenly items-center mb-20 ">
          <el-button class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800" size="large"
            type="success" plain @click="register">注册</el-button>
          <el-button class="dark:opacity-80 shadow-lg hover:-translate-y-1 transform duration-800" size="large"
            type="primary" plain @click="back">返回登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref } from "vue";
import UserType from "@/types/enums/userType"
import { ElNotification } from "element-plus"
import router from "@/router"
import { Logo } from "@/components"
const password = ref<string>('')
const username = ref<string>('')
const loginType = ref<number>(UserType.Student)

const userTypes = [
  {
    value: UserType.Student,
    msg: "学生"
  },
  {
    value: UserType.Receiver,
    msg: "收书员"
  },
  {
    value: UserType.Admin,
    msg: "管理员"
  },
]

const accountPlaceholder = computed(() => {
  return userTypes[loginType.value].msg + "账号"
})
const back = () => {
  router.back()
}

const register = () => {
  ElNotification.success("注册成功")
}

const getVerifyCode = () => {
  ElNotification.success("获取验证码成功")
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
