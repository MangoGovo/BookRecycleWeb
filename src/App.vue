<template>
  <div class="h-screen bg-base-100 flex flex-col">
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
        <el-tooltip content="问题反馈" placement="bottom">
          <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow">
            <el-icon>
              <MessageBox />
            </el-icon>
          </a>
        </el-tooltip>

        <el-tooltip content="聊天" placement="bottom">
          <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow">
            <el-icon>
              <ChatLineSquare />
            </el-icon>
          </a>
        </el-tooltip>

        <el-tooltip content="个人中心" placement="bottom">
          <a class="btn btn-ghost text-xl dark:hover:bg-customGray_more_shallow">
            <el-icon>
              <UserFilled />
            </el-icon>
          </a>
        </el-tooltip>
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
import { RouterView } from 'vue-router'
//暗黑模式功能
import { useDarkModeSwitch } from '@/utils/darkMode'
import { ChatLineSquare, HomeFilled, UserFilled } from '@element-plus/icons-vue'
import router from './router'
const { darkModeStatus } = useDarkModeSwitch() //暗黑模式 状态

const home = () => {
  router.push('/')
}
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
