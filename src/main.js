import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import { createI18n } from 'vue-i18n'
// ElConfigProvider 组件
// 引入中文包
const app = createApp(App)
installElementPlus(app)
app.use(createPinia())
    .use(router)
    .use(createI18n)
    .mount('#app')