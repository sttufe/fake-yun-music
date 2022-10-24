import { createApp } from 'vue'
import ElementPlus from 'element-plus'

//import './style.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import './assets/css/index.scss'
import './assets/icons/index.js'
import { createPinia } from 'pinia'

import piniaPluginPersist from 'pinia-plugin-persist'

const app = createApp(App)
export const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(router).use(pinia).use(ElementPlus).mount('#app')

//createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
