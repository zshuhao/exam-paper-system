import env from './env'
// 存储默认token信息
let basicToken = {
    test: 'b21zOm9tcw==',
    dev: 'b21zOm9tcw==',
    production: 'b21zOmhyc2tBUkE3ZjNaZk5OdEY0TEtwOGk0YjlqR0ZzWjZi'
}

export default basicToken[env]
