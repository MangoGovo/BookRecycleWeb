import { createRouter, createWebHistory } from 'vue-router'
import userViews from '@/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: userViews.LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: userViews.RegisterView
    },
    {
      path: '/forget',
      name: 'forget',
      component: userViews.ForgetView
    }
  ]
})

router.beforeEach((to, _, next) => {
  // const loginStore = useMainStore(pinia).useLoginStore(pinia)
  let pathList: string[] = []
  router.options.routes.forEach((route) => {
    pathList.push(route.path)
  })
  if (pathList.includes(to.path)) {
    next()
    return
  }
  next('/login')
})

export default router
