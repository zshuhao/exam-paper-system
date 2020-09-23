<template>
    <el-aside class="sider">
         <el-menu class="menu" :router="true" :default-active="dafaultRouterIndex"
            text-color="rgba(255,255,255,.7)"
            background-color="#393D49"
            active-text-color="#fff"
            @select="selected">
            <template v-if="env === 'dev'">
                <el-menu-item index="/rolePower">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">角色权限管理</span>
                </el-menu-item>
                <el-menu-item index="/systemPower">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">系统权限管理</span>
                </el-menu-item>
            </template>

            <template v-else v-for="item in sideMenu">
                <el-submenu v-if="item.children" :index="item.path" :key="item.id">
                    <template slot="title">
                        <i class="el-icon-folder-opened"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="i in item.children" :index="i.path" :key="i.id">
                        <i class="el-icon-notebook-2"></i>
                        <span slot="title">{{i.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.path" :key="item.id">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
import { formatTree } from '@src/utils/tool'
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
    methods: {
        selected (index) {
            this.$emit('selected', index)
        }
    }
}
</script>

<style lang="less" scoped>

.sider {
    width: 201px !important;
    background-color: #ffffff;
    .menu {
        height: 100%;
        .icon {
            font-size: 16px;
        }
    }
}

// .el-menu {
//     background-color: #393D49;
// }

// 修改侧边导航的默认样式
.menu:not(.el-menu--collapse) {
    width: 200px;
}

.menu /deep/ .el-submenu__title {
    height: 42px;
    line-height: 42px;
}

.menu /deep/ .el-menu {
   background-color: rgba(0,0,0,.3);
}

.menu /deep/ .el-menu-item {
    height: 39px;
    line-height: 39px;
}

.menu  /deep/ .el-submenu {
    background-color: rgba(0, 0, 0, 0) !important;
}

.menu  /deep/ .is-active {
    background-color: #009688 !important;
    // color: #fff;
}
</style>
