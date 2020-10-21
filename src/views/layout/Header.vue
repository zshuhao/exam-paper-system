
<template>
    <div class="navbar">
        <div class="toggle" @click="onToggleSider">
            <i :class="['iconfont', sidebar ? 'icon-toggle-left' : 'icon-toggle-right']"></i>
        </div>
        <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
const config = require(`../../../config/app.${process.env}.json`)

export default {
    name: 'Header',
    data () {
        return {
            activeIdx: '',
            kthost: config.ktApi
        }
    },
    computed: {
        ...mapGetters(['sidebar'])
    },
    methods: {
        loginOut () {
            this.$emit('loginOut')
        },
        onToggleSider () {
            this.$store.dispatch('app/toggleSideBar')
        }
    }
}
</script>

<style lang="less" scoped>
.navbar {
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .toggle {
        line-height: 50px;
        height: 50px;
        float: left;
        padding: 0px 15px;
        cursor: pointer;
        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
    .breadcrumb {
        margin-left: 5px;
        height: 50px;
        line-height: 50px;
        float: left;
    }
}
</style>
