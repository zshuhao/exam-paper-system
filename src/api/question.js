import request from '@/utils/request'

export function addQuestion (res) {
    return request({
        url: '/question/add',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function queryQuestionList (res) {
    return request({
        url: '/question/list',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function queryQuestion (res) {
    return request({
        url: '/question/ques',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function editQuestion (res) {
    return request({
        url: '/question/edit',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function createExam (res) {
    return request({
        url: '/exam/create',
        method: 'post',
        data: {
            ...res
        }
    })
}
