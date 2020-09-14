import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ajax from './util/ajax'
import './less/reset.css'
import './less/main.less'
import './plugins/element.js'
import './plugins/custom.js'

Vue.prototype.$ajax = ajax
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
