import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import 'tailwindcss/tailwind.css'
import '@/utils/player.js'
import '@/utils/metadata.js'

const app = createApp(App)

app.use(store)

app.use(router)

app.mount('#app')
