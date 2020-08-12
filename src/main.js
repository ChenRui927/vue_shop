import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 全局配置axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 token 验证 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 将axios挂载到vue的原型对象上,这样每一个vue的组件都可以通过this直接访问到$http，从而发起ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
