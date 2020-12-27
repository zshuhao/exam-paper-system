
<template>
    <div class="navbar">
        <div class="toggle" @click="onToggleSider">
            <i :class="['iconfont', sidebar ? 'icon-toggle-left' : 'icon-toggle-right']"></i>
        </div>
        <Breadcrumb></Breadcrumb>
        <div class="user-name">
            <el-tag size="small">{{userInfo.role_name || '无角色'}}</el-tag>
            <el-dropdown trigger="click" @command="onHandleCommand">
                <span class="el-dropdown-link">
                    {{userInfo.user_name || '用户名'}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='exit' icon="el-icon-switch-button">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'
import { mapGetters, mapState } from 'vuex'
const config = require(`../../../config/app.${process.env}.json`)

export default {
    name: 'Header',
    components: { Breadcrumb },
    data () {
        return {
            activeIdx: '',
            kthost: config.ktApi
        }
    },
    computed: {
        ...mapGetters(['sidebar']),
        ...mapState(['userInfo'])
    },
    methods: {
        loginOut () {
            this.$emit('loginOut')
        },
        onToggleSider () {
            this.$store.dispatch('app/toggleSideBar')
        },
        onHandleCommand (command) {
            if (command === 'exit') {
                this.$router.push('/login')
            }
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
    .user-name {
        float: right;
        line-height: 50px;
        padding-right: 20px;
    }
}
</style>
