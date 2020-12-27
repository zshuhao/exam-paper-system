import axios from 'axios'
import { Message } from 'element-ui'

const env = process.env
const config = require(`../../config/app.${env}.json`)
console.log(config)

const service = axios.create({
    baseURL: config.api,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        // console.log(config)
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 0 响应成功
service.interceptors.response.use(
    response => {
        const data = response.data
        if (data.status !== 0) {
            Message.error(data.errDesc)
        }
        return data
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default service
