<template>
  <div class="h-screen bg-base-100 flex flex-col">
    <ActivateForm ref="activateForm" />
    <div class="navbar bg-base-100 shadow-lg gap-10">
      <el-tooltip content="主页" placement="bottom">
        <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow" @click="home">
          <el-icon>
            <HomeFilled />
          </el-icon>
        </a>
      </el-tooltip>

      <div class="flex-1">
        <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow"
          >Book Recycle System</a
        >
      </div>

      <el-switch
        v-model="darkModeStatus"
        size="large"
        active-text="Dark"
        inactive-text="Light"
        style="--el-switch-on-color: #000000"
      />
      <div class="flex gap-5">
        <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow">
          <el-icon>
            <MessageBox />
          </el-icon>
        </a>

        <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow">
          <el-icon>
            <ChatLineSquare />
          </el-icon>
        </a>

        <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow">
          <el-dropdown placement="bottom-end">
            <el-icon>
              <UserFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout()">注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </a>
      </div>
    </div>

    <router-view v-slot="{ Component, route }" class="overflow-none">
      <transition name="fade" mode="out-in">
        <div :key="route.name" class="flex flex-grow">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useDarkModeSwitch } from '@/utils/darkMode'
import { ChatLineSquare, HomeFilled, UserFilled } from '@element-plus/icons-vue'
import router from './router'
import ActivateForm from './components/login/activateForm.vue'
import { ref, watchEffect } from 'vue'
import { useMainStore } from '@/stores'
import { ElNotification } from 'element-plus'

const { darkModeStatus } = useDarkModeSwitch()
const loginStore = useMainStore().useLoginStore()
const route = useRoute()
const activateForm = ref<InstanceType<typeof ActivateForm> | null>(null)

const home = () => {
  router.push('/')
}

const logout = () => {
  loginStore.clearLoginData()
  router.push('/login')
}
watchEffect(async () => {
  // 激活账号
  await router.isReady() // 等待路由加载完成
  if (!['/login', '/register'].includes(route.path) && !loginStore.isActivated) {
    ElNotification.warning('第一次登陆,请先补充个人信息')
    activateForm.value?.open()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

.dark .bg-base-100 {
  background-color: #1a1a1a !important; /* 深色背景色 */
  color: #ffffff !important;
}
</style>

<style scoped>
:deep(.el-divider--vertical) {
  display: inline-block;
  width: 1px;
  height: 70%;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
</style>
