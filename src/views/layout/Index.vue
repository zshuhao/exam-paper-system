<template>
    <div :class="classObj" class="app-container">
        <Sider></Sider>
        <div class="main-container">
            <Header></Header>
            <AppMain></AppMain>
        </div>
    </div>
</template>

<script>
import Header from './Header'
import Sider from './Sider'
import AppMain from './AppMain'
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    components: { Header, Sider, AppMain },
    data () {
        return {
            routerViewShow: true,
            pageVisible: true
        }
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        classObj () {
            return {
                hideSidebar: !this.sidebar,
                openSidebar: this.sidebar
                // withoutAnimation: this.sidebar.withoutAnimation,
                // mobile: this.device === 'mobile'
            }
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
            const config = require(`../../../config/app.${env}.json`)
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
            const config = require(`../../../config/app.${env}.json`)
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
.app-container {
    position: relative;
    height: 100%;
    width: 100%;
}

.main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
}

</style>
