import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// import ajax from './utils/axios'
// import './assets/reset.css'
import './assets/iconfont/iconfont.css'
import '@/plugins/element.js'
import '@/plugins/custom.js'
import '@/less/index.less'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /* { default global options } */)
// import './plugins/custom.js'
// import { Message } from 'element-ui'
// Vue.config.productionTip = false
// Vue.prototype.$message = Message

// Vue.prototype.$ajax = ajax

console.log(process.env)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
