import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/layout/Index.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home',
            children: [
                {
                    path: '/department',
                    name: 'Department',
                    meta: {
                        title: '院系管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@/views/Department.vue')
                },
                {
                    path: '/profession',
                    name: 'Profession',
                    meta: {
                        title: '专业管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@/views/Profession.vue')
                },
                {
                    path: '/course',
                    name: 'Course',
                    meta: {
                        title: '科目管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@/views/Course.vue')
                },
                {
                    path: '/exam',
                    name: 'Exam',
                    meta: {
                        title: '试卷管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@/views/Exam.vue')
                },
                {
                    path: '/questionBank',
                    name: 'QuestionBank',
                    meta: {
                        title: '题库管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@/views/QuestionBank.vue')
                }
                // {
                //     path: '/test2',
                //     name: 'Test2',
                //     component: () => import(/* webpackChunkName: "main" */ '@/views/test2.vue')
                // }
            ]
        }
    ]
})
