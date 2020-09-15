<template>
    <el-container>
        <el-header class="header">
            <Header @loginOut="loginOut" />
        </el-header>
        <el-container class="cont">
             <Sider class="sider" @selected="selected" />
            <el-main>
                <router-view v-if="pageVisible && routerViewShow"></router-view>
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
            pageVisible: false
        }
    },
    async created () {
        const { query, path } = this.$route
        const queryToken = query.infp_kt_token

        if (queryToken) {
            this.$store.dispatch('setKtToken', queryToken)
            this.pageVisible = await this.fetchToken(queryToken) && await this.fetchMenu(queryToken)
        } else {
            const token = this.$store.getters.getKtAccess
            if (token) {
                this.pageVisible = await this.fetchToken(token) && await this.fetchMenu(token)
            } else {
                this.fetchKtToken(path)
            }
        }
    },
    methods: {
        fetchToken (token) {
            return new Promise((resolve, reject) => {
                const tokenStr = `auth_data=${token}&grant_type=secret`
                this.$ajax({
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    type: 'token',
                    data: tokenStr,
                    getToken: true
                }).then(res => {
                    if (res.status === 200) {
                        const accessToken = res.data.access_token
                        this.$store.dispatch('setToken', accessToken)
                        this.fetchUserInfo()
                        resolve(true)
                    }
                }).catch(err => {
                    // ktToken 失效的情况下也是 500 状态
                    if (err.response.status === 500) {
                        this.$alert('登录已失效，请重新登录！', '提示', {
                            type: 'warning',
                            nfirmButtonText: '确定',
                            callback: action => {
                                if (action === 'confirm') {
                                    this.loginOut()
                                }
                            }
                        })
                    }
                    resolve(false)
                })
            })
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
    color: #666;
    background-color: #23262E;
    border-bottom: 1px solid #23262E;
}
.cont {
    height: calc(100% - 60px);
}
.el-main {
    padding-top: 10px;
    background-color: #eee;
}
.header {
    color: #666;
    background-color: #23262E;
    border-bottom: 1px solid #23262E;
}
.cont {
    height: calc(100% - 60px);
}
.el-main {
    padding-top: 10px;
    background-color: #eee;
}
</style>
