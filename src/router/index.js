import Vue from 'vue'
import Router from 'vue-router'
import Home from '@src/views/Home.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home',
            children: [
                {
                    path: '/test1',
                    name: 'Test1',
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/test1.vue')
                },
                {
                    path: '/test2',
                    name: 'Test2',
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/test2.vue')
                }
            ]
        }
    ]
})
