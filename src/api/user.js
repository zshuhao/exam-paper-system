import request from '@/utils/request'

export function userLogin (res) {
    return request({
        url: '/login',
        method: 'post',
        data: res
    })
}

export function userList (res) {
    return request({
        url: '/system/userList',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function addUser (res) {
    return request({
        url: '/system/addUser',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function editUser (res) {
    return request({
        url: '/system/editUser',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function deleteUser (res) {
    return request({
        url: '/system/deleteUser',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function roleList () {
    return request({
        url: '/system/roleList',
        method: 'GET',
        params: {}
    })
}
