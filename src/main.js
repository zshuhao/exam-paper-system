import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ajax from './utils/axios'
// import './assets/reset.css'
// import './assets/main.less'
import '@src/plugins/element.js'
import '@src/plugins/custom.js'
import '@src/less/index.less'
// import './plugins/custom.js'
// import { Message } from 'element-ui'
// Vue.config.productionTip = false
// Vue.prototype.$message = Message

Vue.prototype.$ajax = ajax

console.log(process.env)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
