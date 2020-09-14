
<template>
    <div>
        <div class="logo">开天后台</div>
        <el-col :xs="8" :sm="12" :md="16" :lg="18" >
            <el-menu :default-active="activeIdx" class="el-menu-demo fl-right"
                    mode="horizontal"
                    background-color="#23262E"
                    text-color="rgba(255,255,255,.7)"
                    active-text-color="rgb(242, 246, 249)">
                <el-menu-item class="menu-item" v-for="item in menuList"
                              :key="item.id"
                              :index="item.name">
                    <a :href="kthost + item.url">{{item.name}}</a>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-dropdown class="loginOut" trigger="click">
            <span class="username">
                <i class="iconfont icon-gerenzhongxin"></i><span>{{userInfo.userName || '用户名'}}</span><i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span class="out" @click="loginOut"><i class="iconfont icon-shezhi"></i>退出</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import env from '@/config/env'
import { ktApi } from '../../config/baseURL'
import logout from '../../mixins/logout'
export default {
    name: 'Header',
    mixins: [logout],
    data () {
        return {
            activeIdx: '任务中心',
            kthost: ktApi[env]
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        },
        menuList () {
            return this.$store.state.ktMenu || []
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-demo /deep/ .is-active {
    color: #fff;
    border-bottom: 4px solid !important;
    border-bottom-color: #5FB878 !important;
}

.logo {
    box-sizing: border-box;
    float: left;
    height: 60px;
    width: 200px;
    text-align: center;
    line-height: 60px;
    color: #009688;
    padding-right: 40px;
}
.el-menu-demo {
    height: 59px;
    overflow: hidden;
    border-bottom: solid 1px #23262E !important;
    &:hover {
        position: relative;
        z-index: 10;
        background-color: #F8F8F8;
        height: auto;
        overflow: auto;
    }
    .menu-item {
        height: 59px;
        &:hover {
            border-bottom: 4px solid #5FB878 !important;
        }
    }
}

.loginOut {
    float: right;
    height: 58px;
    line-height: 58px;
    cursor: pointer;
    .username {
        color: rgba(255,255,255,.7);
    }
    i {
        font-size: 14px;
        margin: 0 5px;
    }
}
.out {
    i {
        font-size: 14px;
        margin-right:5px;
    }
}
</style>
