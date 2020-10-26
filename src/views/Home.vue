<template>
    <el-container>
        <Sider @selected="selected" />
        <el-container class="cont">
            <el-header class="header">
                <Header @loginOut="loginOut" />
            </el-header>
            <el-main>
                <transition name="fade-transform" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from './layout/Header'
import Sider from './layout/Sider'

export default {
    name: 'Home',
    components: { Header, Sider },
    data () {
        return {
            routerViewShow: true,
            pageVisible: true
        }
    },
    async created () {

    },
    methods: {
        fetchToken (token) {

        },

        fetchUserInfo () {
            this.$ajax({
                type: 'userPermission',
                method: 'GET'
            }).then(res => {
                if (res.data.success && res.data.data) {
                    this.$store.dispatch('setUserInfo', res.data.data)
                }
            })
        },

        // 重新获取ktToken
        fetchKtToken (cbPath) {
            const env = process.env
            const config = require(`../../config/app.${env}.json`)
            const cbUrl = encodeURIComponent(config.back)
            window.location.href = `${config.ktApi}/auth/redirectUrl?callback_url=${cbUrl}${cbPath}`
        },

        // 获取顶部菜单
        fetchMenu (token) {
            return new Promise((resolve, reject) => {
                this.$ajax({
                    header: {
                        'Content-Type': 'application/json',
                        'infp-kt-token': token
                    },
                    method: 'GET',
                    type: 'getKtMenu'
                }).then(res => {
                    if (res.data.status) {
                        if (res.data.status === 101) { // 101 token 失效
                            this.$alert('登录已失效，请重新登录！', '提示', {
                                type: 'warning',
                                nfirmButtonText: '确定',
                                callback: action => {
                                    if (action === 'confirm') {
                                        this.loginOut()
                                    }
                                }
                            })
                        } else {
                            this.$message.error(`${res.data.msg}`)
                            resolve(false)
                        }
                    } else {
                        const { menus } = res.data.data || []
                        this.$store.dispatch('setMenus', menus)
                        resolve(true)
                    }
                }).catch(() => {
                    resolve(false)
                })
            })
        },

        loginOut () {
            const token = this.$store.getters.getAccessToken
            const env = process.env
            const config = require(`../../config/app.${env}.json`)
            const url = `${config.ktApi}/auth/logout?access_token=${token}&redirect_uri=` + encodeURIComponent(`${config.ktApi}/auth/callback`)

            this.$store.dispatch('setToken', {})
            this.$store.dispatch('setKtToken', {})
            window.location.href = url
        },

        // 点击导航重新刷新页面
        selected (index) {
            const route = this.$route
            const path = route.query.no === undefined
                ? route.path
                : `${route.path}?no=${route.query.no}`
            if (index === path) {
                this.routerViewShow = false
                this.$nextTick(() => (this.routerViewShow = true))
            }
        }

    }
}
</script>

<style scoped lang="less">
.header {
    padding: 0;
    // color: #666;
    // background-color: #23262E;
    // border-bottom: 1px solid #23262E;
}
// .cont {
//     height: calc(100% - 60px);
// }
// .el-main {
//     padding-top: 10px;
//     background-color: #eee;
// }
// .header {
//     color: #666;
//     background-color: #23262E;
//     border-bottom: 1px solid #23262E;
// }
// .cont {
//     height: calc(100% - 60px);
// }
.el-main {
    overflow-x: hidden;
    // padding-top: 10px;
    // background-color: #eee;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
