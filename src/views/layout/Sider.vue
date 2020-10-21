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

        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>阿斯顿发</span>
            </template>
            <el-menu-item index="/test1">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">发烧吧</span>
            </el-menu-item>
            <el-menu-item index="/test2">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">订单</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">发送到</span>
        </el-menu-item>

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
            dafaultIndex: ''
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
