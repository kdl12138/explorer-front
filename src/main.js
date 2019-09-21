
import '@/assets/style/style.scss';
import 'font-awesome/css/font-awesome.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import * as filters from '@/assets/js/filter'

import page from 'Components/page.vue'
import i18n from './i18n'

const components = [
  page
]
components.forEach(component => {
  Vue.component(component.name, component)
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Vue.use(HappyScroll)

Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
