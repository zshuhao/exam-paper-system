<template>
    <el-container>
        <el-header class="header">
            <Header />
        </el-header>
        <el-container class="cont">
             <Sider class="sider" @selected="selected" />
            <el-main>
                <router-view v-if="flag && routerViewShow"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from './layouts/Header'
import Sider from './layouts/Sider'
import env from '../config/env'
import { backToUs, ktApi } from '../config/baseURL'
import logout from '../mixins/logout'
export default {
    name: 'Home',
    components: {
        Header,
        Sider
    },
    mixins: [logout],
    data () {
        return {
            routerViewShow: true,
            flag: false
        }
    },
    async created () {
        const { query, path } = this.$route
        const queryToken = query.infp_kt_token

        // 如果url中有ktToken则每次都去获取accessToken，没有再去检测本地保存的ktToken是否在有效期内
        if (queryToken) {
            const ktAccess = {
                token: queryToken,
                expired: Date.now() + 0.1 * 3600 * 1000
            }
            this.$store.commit('KTACCESS', ktAccess)
            this.flag = await this.getAccessToken(ktAccess.token) && await this.getMenu(ktAccess.token)
        } else {
            const { token } = this.$store.state.ktAccess
            if (token) {
                this.flag = await this.getAccessToken(token) && await this.getMenu(token)
            } else {
                this.getKTCode(path)
            }
        }
    },
    methods: {
        getAccessToken (token) {
            return new Promise((resolve, reject) => {
                const tokenStr = `auth_data=${token}&grant_type=secret`
                this.$ajax({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    type: 'token',
                    data: tokenStr,
                    getToken: true
                }).then(res => {
                    if (res.status === 200) {
                        let accessToken = {
                            token: res.data.access_token,
                            expired: Date.now() + 0.1 * 3600 * 1000
                        }
                        this.$store.commit('ACCESSTOKEN', accessToken)
                        this.getPermisson()
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
        getPermisson () { // 获取用户信息
            this.$ajax({
                type: 'userPermission',
                method: 'GET'
            }).then(res => {
                if (res.data.success && res.data.data) {
                    this.$store.commit('USERINFO', res.data.data)
                }
            })
        },
        getKTCode (cbPath) { // 重新获取ktToken
            let uri = ktApi[env]
            let cbUrl = encodeURIComponent(backToUs[env])
            // token 失效 跳转页面重新获取token
            window.location.href = `${uri}/auth/redirectUrl?callback_url=${cbUrl}${cbPath}`
        },
        getMenu (token) { // 获取菜单
            return new Promise((resolve, reject) => {
                this.$ajax({
                    headers: {
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
                        const { menus } = res.data.data
                        this.$store.commit('KTMENU', menus)
                        resolve(true)
                    }
                }).catch(() => {
                    resolve(false)
                })
            })
        },
        selected (index) { // 点击导航重新刷新页面
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
</style>
