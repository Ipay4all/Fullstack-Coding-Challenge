// import Vue from 'vue'
import routes from './routes'
import { createWebHistory, createRouter } from 'vue-router';

// Vue.use(Router)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router