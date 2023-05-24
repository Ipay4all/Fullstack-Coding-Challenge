import './common'

import Vue from 'vue'
import Loader from './common/Loader'

// Components that are registered globaly.
[
  Loader
].forEach(Component => {
  Vue.component(Component.name, Component)
})
