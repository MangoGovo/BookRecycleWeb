import { createRouter, createWebHistory } from 'vue-router'
import { AdminViews, ReceiverViews, StudentViews, UserViews } from '@/views'
import { useMainStore } from '@/stores'
import UserType from '@/types/enums/userType'
import pinia from '@/stores/createPinia'
import useLoginStore from '@/stores/service/loginStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: UserViews.LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: UserViews.RegisterView
    },
    {
      path: '/forget',
      name: 'forget',
      component: UserViews.ForgetView
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: UserViews.UserCenterView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentViews.HomeView
    },
    {
      path: '/student/market',
      name: '/student/market',
      component: StudentViews.MarketView
    },
    {
      path: '/student/sell',
      name: '/student/sell',
      component: StudentViews.SellView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminViews.HomeView
    },
    {
      path: '/student/chat',
      component: StudentViews.ChatView
    },
    {
      path: '/',
      redirect: () => {
        const loginStore = useMainStore(pinia).useLoginStore(pinia)
        switch (loginStore.userType) {
          case UserType.Student:
            return '/student'
          case UserType.Receiver:
            return '/receiver'
          case UserType.Admin:
            return '/admin'
          default:
            return '/login'
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loginStore = useMainStore(pinia).useLoginStore(pinia)
  if (!loginStore.isLogin && !['/login', '/register', '/forget'].includes(to.path)) {
    next({ path: '/login', replace: true, force: true })
    return
  }
  let pathList: string[] = router.options.routes.map((route) => route.path)
  if (pathList.includes(to.path)) {
    next()
    return
  }
  next('/')
})

export default router
