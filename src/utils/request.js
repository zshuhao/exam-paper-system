import axios from 'axios'
const env = process.env
const config = require(`../../config/app.${env}.json`)

console.log(config)

const service = axios.create({
    baseURL: 'asdfas',
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default service
