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
                    path: '/rolePower',
                    name: 'RolePower',
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/rolePower/RoleList.vue')
                },
                {
                    path: '/systemPower',
                    name: 'SystemPower',
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/systemPower/SystemPower.vue')
                }
            ]
        }
    ]
})
