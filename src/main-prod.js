import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入树形表格
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入Nprogress（进度条） 包对应的js和css 
import Nprogress from 'nprogress'

// 全局配置axios
import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在 request 拦截器中，显示进度条 Nprogress.start()
// 配置请求拦截器，请求拦截器是在请求数据发出前设置一些信息
axios.interceptors.request.use(config => {
  // 展示进度条
  Nprogress.start()
  // 为请求头对象，添加 token 验证 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 Nprogress.done()
// 配置响应拦截器，响应拦截器是在获取数据之前，对数据进行一些加工处理
axios.interceptors.response.use(config => {
  // 隐藏进度条
  Nprogress.done()
  // 在最后必须 return config
  return config
})

// 将axios挂载到vue的原型对象上,这样每一个vue的组件都可以通过this直接访问到$http，从而发起ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 在全局自定义一个格式化时间的过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  // return `yyyy-mm-dd hh:mm:ss`
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
