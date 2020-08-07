import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// Button按钮组件，Form, FormItem表单组件，Input输入框组件, Message弹框提示组件
// import { Input } from 'element-ui'
// import { Button } from 'element-ui'
// import { Form, FormItem } from 'element-ui'
// import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
