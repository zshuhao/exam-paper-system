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
                    path: '/department',
                    name: 'Department',
                    meta: {
                        title: '院系管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/Department.vue')
                },
                {
                    path: '/profession',
                    name: 'Profession',
                    meta: {
                        title: '专业管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/Profession.vue')
                },
                {
                    path: '/course',
                    name: 'Course',
                    meta: {
                        title: '科目管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/Course.vue')
                },
                {
                    path: '/exam',
                    name: 'Exam',
                    meta: {
                        title: '试卷管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/Exam.vue')
                },
                {
                    path: '/questionBank',
                    name: 'QuestionBank',
                    meta: {
                        title: '题库管理'
                    },
                    component: () => import(/* webpackChunkName: "main" */ '@src/views/QuestionBank.vue')
                }
                // {
                //     path: '/test2',
                //     name: 'Test2',
                //     component: () => import(/* webpackChunkName: "main" */ '@src/views/test2.vue')
                // }
            ]
        }
    ]
})
