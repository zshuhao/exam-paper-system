<template>
    <div class="sider-container">
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

            <template v-for="item in sideMenu">
                <el-submenu v-if="item.children && item.children.length > 0" index="1" :key="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :key="child.id" :index="child.url">
                        <i :class="child.icon"></i>
                        <span slot="title">{{ child.name }}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="item.id" :index="item.url">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import variable from '../../less/variable.less'
import { formatTree } from '@/utils/tool'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'Sider',
    data () {
        return {}
    },
    computed: {
        ...mapGetters(['sidebar']),
        ...mapState(['userInfo']),
        isCollapse () {
            return !this.sidebar
        },
        variable () {
            return variable
        },
        sideMenu () {
            const menu = this.$store.state.userInfo.menu || []
            const pid = null
            const menuList = JSON.parse(JSON.stringify(menu))
            return formatTree(menuList, pid) || []
        },
        dafaultRouterIndex () {
            const route = this.$route
            return route.path
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
.sider-container {
    transition: width 0.28s;
    width: 210px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    .menu {
        border: none;
    }
}
.menu:not(.el-menu--collapse) {
    width: 210px;
}
.menu  /deep/ .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
}

</style>
