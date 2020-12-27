import request from '@/utils/request'

export function userLogin (res) {
    return request({
        url: '/login',
        method: 'post',
        data: res
    })
}
