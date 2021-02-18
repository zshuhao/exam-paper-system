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

export function queryExamList (res) {
    return request({
        url: '/exam/list',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function downExam (res) {
    return request({
        url: '/exam/down',
        method: 'post',
        data: {
            ...res
        }
    })
}

export function deleteExam (res) {
    return request({
        url: '/exam/delete',
        method: 'post',
        data: {
            ...res
        }
    })
}