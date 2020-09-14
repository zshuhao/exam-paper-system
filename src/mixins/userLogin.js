import env from '../config/env'
import { Message } from 'element-ui'
import { ktApi, backToUs } from '../config/baseURL'

export default {
    data () {
        return {
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
                        this.getPermission()
                        resolve(true)
                    }
                }).catch(err => {
                    this.$message(err.message)
                    resolve(false)
                })
            })
        },
        getPermission () { // 获取用户信息
            this.$ajax({
                type: 'userPermission',
                method: 'GET'
            }).then(res => {
                if (res.data.success && res.data.data) {
                    this.$store.commit('USERINFO', res.data.data)
                }
            }).catch(err => {
                this.$message(err.message)
            })
        },
        getKTCode (cbPath) { // 获取OA的路由code
            let uri = ktApi[env]
            let cbUrl = encodeURIComponent(backToUs[env])
            // token 失效 跳转页面重新获取token
            window.location.href = `${uri}/auth/redirectUrl?callback_url=${cbUrl}${cbPath}`
        },
        getMenu (token) {
            this.$ajax({
                headers: {
                    'Content-Type': 'application/json',
                    'infp-kt-token': token
                },
                method: 'GET',
                type: 'getKtMenu'
            }).then(res => {
                if (res.data.status) {
                    Message.error(`${res.data.msg}`)
                } else {
                    const { menus } = res.data.data
                    this.$store.commit('KTMENU', menus)
                }
            }).catch(() => {
                Message.error(`请求错误`)
            })
        }
    }
}
