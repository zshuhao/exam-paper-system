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

export function roleList (res) {
    return request({
        url: '/system/roleList',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function addRole (res) {
    return request({
        url: '/system/addRole',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function editRole (res) {
    return request({
        url: '/system/editRole',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function deleteRole (res) {
    return request({
        url: '/system/deleteRole',
        method: 'POST',
        data: {
            ...res
        }
    })
}

export function queryPermissions () {
    return request({
        url: '/system/permissions',
        method: 'POST',
        data: {}
    })
}
