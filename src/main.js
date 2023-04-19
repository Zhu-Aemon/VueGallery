import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import 'tailwindcss/tailwind.css'
import '@/utils/player.js'
import '@/utils/metadata.js'
// import './test.js'
import '@/assets/main.css'

const app = createApp(App)

app.use(store)

app.use(router)

app.mount('#app')
