import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import './assets/css/main.css'
import './assets/icons/iconfont.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/router/permission'
import { createPinia } from 'pinia'
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(router).use(ElementPlus).mount('#app')
