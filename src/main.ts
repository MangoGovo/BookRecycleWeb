import { createApp } from 'vue'
import pinia from '@/stores/createPinia'
import './style.css'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import "go-captcha-vue/dist/style.css"
import GoCaptcha from "go-captcha-vue"


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.use(GoCaptcha)

app.mount('#app')
