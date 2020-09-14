import store from '../store/index'
import env from '../config/env'
import { ktApi, logout } from '../config/baseURL'
export default {
    methods: {
        loginOut () { // 退出
            const { token } = store.state.accessToken
            const url = `${logout[env]}?access_token=${token}&redirect_uri=` + encodeURIComponent(`${ktApi[env]}/auth/callback`)
            // const url = `${logout[env]}?access_token=${token}&redirect_uri=` + encodeURIComponent(`${backToUs[env]}/`)
            const user = {
                userName: '用户名',
                apartment: '',
                companyName: '美味不用等(上海)信息科技股份有限公司'
            }
            store.commit('ACCESSTOKEN', {})
            store.commit('KTACCESS', {})
            store.commit('USERINFO', { ...user })
            window.location.href = url
        }
    }
}
