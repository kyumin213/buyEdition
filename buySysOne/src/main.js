// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import global_ from '@/components/global'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['token'] = sessionStorage.getItem('sessionid')
Vue.prototype.GLOBAL = global_
if (process.env.NODE_ENV === 'production') {
  Vue.prototype.GLOBAL.BASE_URL = 'http://119.23.78.0' // 测试接口
  // Vue.prototype.GLOBAL.BASE_URL = 'http://www.handyfitness.com.cn:8094' // 正式接口
} else {
  // Vue.prototype.GLOBAL.BASE_URL = '开发测试地址'
  Vue.prototype.GLOBAL.BASE_URL = '/api'
}
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('token')
  if (!role && to.path !== '/index') {
    next('/index')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      })
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')