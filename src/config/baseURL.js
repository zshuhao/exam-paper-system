// 回调到本系统地址
const backToUs = {
    test: 'http://kt.test.9now.net/webresource/taskCenterWeb/#',
    production: 'http://kt.mwee.cn/webresource/taskCenterWeb/#',
    dev: 'http://localhost:8093/#'
}

// 接口请求地址
const api = {
    dev: 'http://kt-test.st.9now.net',
    test: 'http://kt-test.st.9now.net',
    production: 'http://gateway-infc.mwee.cn'
}

// 接口请求地址（开天）
const ktApi = {
    dev: 'http://kt.test.9now.net',
    test: 'http://kt.test.9now.net',
    production: 'http://kt.mwee.cn'
}

// 退出
const logout = {
    production: 'http://kt.mwee.cn/auth/logout',
    test: 'http://kt.test.9now.net/auth/logout',
    dev: 'http://kt.test.9now.net/auth/logout'
}

// 退出操作重定向地址
// const logoutRedirect = {
//     test: 'http://auth-infc.test.9now.net/login',
//     production: 'http://cas.mweer.com/login',
//     dev: 'http://auth-infc.test.9now.net/login'
// }

// const oaRedirectHost = {
//     test: 'http://oa.test.9now.net/Webrest/redirect',
//     production: 'http://oa.mwee.cn/Webrest/redirect',
//     dev: 'http://oa.test.9now.net/Webrest/redirect'
// }

export {
    backToUs,
    api,
    ktApi,
    logout
}
