import request from '@/utils/request'

export function queryDepartmentList () {
    return request({
        url: '/department/departmentList',
        method: 'post',
        data: {}
    })
}

export function addDepartment (res) {
    return request({
        url: '/department/addDepartment',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function editDepartment (res) {
    return request({
        url: '/department/editDepartment',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function deleteDepartmen (res) {
    return request({
        url: '/department/deleteDepartment',
        method: 'post',
        data: {
            ...res
        }
    })
}

// 专业

export function queryProfessionList (res = {}) {
    return request({
        url: '/department/professionList',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function addProfession (res) {
    return request({
        url: '/department/addProfession',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function editProfession (res) {
    return request({
        url: '/department/editProfession',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function deleteProfession (res) {
    return request({
        url: '/department/deleteProfession',
        method: 'post',
        data: {
            ...res
        }
    })
}

// 科目

export function queryCourseList (res = {}) {
    return request({
        url: '/department/courseList',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function addCourse (res) {
    return request({
        url: '/department/addCourse',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function editCourse (res) {
    return request({
        url: '/department/editCourse',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function deleteCourse (res) {
    return request({
        url: '/department/deleteCourse',
        method: 'post',
        data: {
            ...res
        }
    })
}

// 知识点

export function queryPoints (res) {
    return request({
        url: '/department/points',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function addPoints (res) {
    return request({
        url: '/department/addPoints',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function deletePoints (res) {
    return request({
        url: '/department/deletePoints',
        method: 'post',
        data: {
            ...res
        }
    })
}
