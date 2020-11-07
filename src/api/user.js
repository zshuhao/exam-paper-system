import request from '@/utils/request'

export function userLogin (res) {
    return request({
        url: '/eps/login',
        method: 'post',
        data: res
    })
}

export function getUserInfo (res) {
    return request({
        url: '/eps/userInfo',
        method: 'get',
        params: {
            token: res
        }
    })
}
