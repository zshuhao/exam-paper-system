import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/views/Home.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
            // children: [
            //     {
            //         path: '/index',
            //         name: 'Index',
            //         component: () => import(/* webpackChunkName: "main" */ './views/brand/List.vue')
            //     }
            // ]
        }
    ]
})
