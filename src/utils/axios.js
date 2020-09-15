import axios from 'axios'
import api from '../dict/api'
import store from '../store/index'
const env = process.env
const config = require(`../../config/app.${env}.json`)

console.log(config)

const ajax = options => {
    const header = options.header || {
        'Content-Type': 'application/json;charset=UTF-8'
    }

    header.Authorization = api[options.type].needLogin
        ? `Bearer ${store.getters.getToken}`
        : `Basic ${config.basicToken}`

    !options.data && (options.data = {})
    options.headers = header
    options.method = options.method || 'post'
    options.url = config.api + api[options.type].url

    if (api[options.type].needKtAuth) {
        options.url = config.ktApi + api[options.type].url
        // options.headers = {
        //     'Content-Type': 'application/json'
        // }
        // const ktAccess = store.state.getKtAccess
        // console.log(ktAccess)
        // if (ktAccess) {
        //     options.headers['infp-kt-token'] = ktAccess
        // }
    }

    if (options.method.toUpperCase() === 'GET') {
        options.params = options.data
    }
    // console.log(options)
    return axios(options)
}

export default ajax
