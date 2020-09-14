import axios from 'axios'
import store from '../store/index'
import env from '../config/env'
import basicToken from '../config/basicToken'
import { Message } from 'element-ui'
import urlDict from '../config/urlDict'
import { ktApi, api } from '../config/baseURL'

// axios.defaults.timeout = '' // 请求的超时时间

// 响应拦截器
axios.interceptors.response.use(res => {
    if (res.status && res.status === 200 && res.data.success) {
        return res
    } else {
        // 状态200但是报错的情况
        if (!res.data) {
            Message.error({ message: res.data.sysErrDesc })
        } else if (res.data && res.data.sysErrDesc) {
            Message.error({ message: res.data.sysErrDesc || res.data.sysExcep })
        } else if (res.data && res.data.data && res.data.data.err && res.data.data.err.errMsg) {
            Message.error({ message: res.data.data.err.errMsg })
        }
        return res
    }
}, (err) => {
    if (err && err.response) {
        switch (err.response.status) {
        case 401:
            err.message = err.response.data.sysErrDesc || '登录失效，请重新登录!'
            break
        case 500:
            // 请求接口为获取 token 时提前返回
            if (err.response.config.type === 'token') return Promise.reject(err)
            err.message = err.response.data.sysErrDesc || '服务器内部错误'
            break
        }
        Message.error(err.message)
    } else if (typeof err.response === 'undefined') {
        Message.error('服务器错误，请稍后重试！')
    }
    return Promise.reject(err)
})

/**
 * 函数的参数options为axios的配置
 * method => 方法名 "POST"等
 * url => 路径,实际调用时传type即可，即为urlDict的key
 * data => 数据的对象
 * 调用前将type值转为对应的url
 */
let ajax = options => {
    let header = options.headers || options.header || {
        'Content-Type': 'application/json;charset=UTF-8'
    }
    if (urlDict[options.type].needLogin) { // needLogin
        header.Authorization = `Bearer ${store.state.accessToken.token}`
    } else {
        header.Authorization = `Basic ${basicToken}`
    }
    options.headers = header
    options.method = options.method || 'post'
    if (urlDict[options.type].needKtAuth) {
        options.url = ktApi[env] + urlDict[options.type].url
        options.headers = {
            'Content-Type': 'application/json'
        }
        if (store.state.ktAccess.token) {
            options.headers['infp-kt-token'] = `${store.state.ktAccess.token}`
        }
    } else {
        options.url = api[env] + urlDict[options.type].url
    }
    !options.data && (options.data = {})
    if (options.method.toUpperCase() === 'GET') {
        options.params = options.data || {}
        const keys = Object.keys(options.params)
        let url = options.url
        let flag = false
        keys.forEach(key => {
            const reg = new RegExp(`:${key}(?=\\/|\\b)`, 'g')
            flag = reg.test(url)
            url = url.replace(reg, options.params[key])
        })
        options.params = flag ? {} : options.params
        options.url = url
    } else {
        options.data = options.data || {}
    }
    // console.log(options)
    return axios(options)
}

export default ajax
