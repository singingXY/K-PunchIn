import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Mock from './mock' // 引入mock模块
Mock.start() //并且执行初始化函数

import { Toast, NavBar } from 'vant'

Vue.use(Toast).use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
