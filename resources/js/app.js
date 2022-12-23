import {createApp} from 'vue'
import router from '~/router'
import App from '~/components/App'
import Base from './base'


const app = createApp({
  extends: App,
  mixins: [Base],
  components: {}
})

app.use(router) 

app.mount('#app')