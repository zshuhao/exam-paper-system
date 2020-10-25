<template>
    <el-menu
        class="menu"
        :default-active="dafaultRouterIndex"
        :collapse="isCollapse"
        :background-color="variable.menuBg"
        :text-color="variable.menuText"
        :active-text-color="variable.menuActiveText"
        :collapse-transition="true"
        :router="true"
        @select="selected">

        <template v-for="item in routeList">
            <el-submenu v-if="item.children && item.children.length > 0" index="1" :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="item.id" :index="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
import variable from '../../less/variable.less'
import { formatTree } from '@src/utils/tool'
import { mapGetters } from 'vuex'
const env = process.env
export default {
    name: 'Sider',
    data () {
        return {
            env,
            dafaultIndex: '',
            routeList: [
                {
                    id: '1',
                    icon: 'el-icon-notebook-2',
                    path: '/',
                    name: '首页'
                },
                {
                    id: '2',
                    icon: 'el-icon-notebook-2',
                    path: '/department',
                    name: '院系管理'
                },
                {
                    id: '3',
                    icon: 'el-icon-notebook-2',
                    path: '/profession',
                    name: '专业管理'
                },
                {
                    id: '4',
                    icon: 'el-icon-notebook-2',
                    path: '/course',
                    name: '科目管理'
                },
                {
                    id: '5',
                    icon: 'el-icon-notebook-2',
                    path: '/exam',
                    name: '试卷管理'
                },
                {
                    id: '6',
                    icon: 'el-icon-notebook-2',
                    path: '/questionBank',
                    name: '题库管理'
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        isCollapse () {
            return !this.sidebar
        },
        variable () {
            return variable
        },
        sideMenu () {
            let menu = this.$store.state.userInfo.permissionList || []
            let pid = ''

            menu = menu.filter(item => {
                const pattern = /^(M0206)/
                if (item.code === 'M0206') pid = item.id

                return item.code !== 'M0206' && pattern.test(item.code)
            })

            const menuList = JSON.parse(JSON.stringify(menu))
            console.log(menuList)
            // console.log(formatTree(menuList, pid))
            return formatTree(menuList, pid) || []
        },
        dafaultRouterIndex () {
            const route = this.$route
            return route.query.no === undefined
                ? route.path
                : `${route.path}?no=${route.query.no}`
        }
    },
    mounted () {
        console.log(variable)
    },
    methods: {
        selected (index) {
            this.$emit('selected', index)
        }
    }
}
</script>

<style lang="less" scoped>

// .sider {
//     width: 210px !important;
//     transition: width 0.28s;
//     .menu {
//         height: 100%;
//         // .icon {
//         //     font-size: 16px;
//         // }
//     }
// }
// .hideSidebar {
//     width: 65px !important;
// }
.menu:not(.el-menu--collapse) {
    width: 200px;
}
.menu  /deep/ .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
}

</style>
