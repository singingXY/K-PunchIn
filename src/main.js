import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible' // 移动端适配
import BaiduMap from 'vue-baidu-map' //baidu Map
import Mock from './mock' // 引入mock模块
Mock.start() //并且执行初始化函数

import { Toast, NavBar } from 'vant'

Vue.use(Toast).use(NavBar)

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'IbuQ6wWBbvPUov1CilW0tsfKZTvjMYve'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
