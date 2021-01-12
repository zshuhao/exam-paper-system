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
