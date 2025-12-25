import axios from 'axios'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/variables.css'

axios.defaults.baseURL = `${import.meta.env.VITE_API_ROOT}/api`

const app = createApp(App)
app.use(router)

app.mount('#app')
