import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import 'tailwindcss/tailwind.css'
import '@/utils/player.js'
import '@/utils/metadata.js'
import '@/assets/main.css'

const app = createApp(App)

library.add(faUserSecret)

app.use(store)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
