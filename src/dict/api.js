const api = {
    token: {
        url: '/auth/secret/token', // 获取accessToken，密文交换的形式
        needLogin: false
    },
    accessToken: {
        url: '/auth/oauth/token', // 获取accessToken，登录交换的形式
        needLogin: false
    },
    userPermission: {
        url: '/auth/user/getUserPermissions', // 获取用户信息
        needLogin: true
    },
    getKtMenu: {
        url: '/api/web/getMenu', // 获取开天菜单
        needKtAuth: true
    },
    getSkuFields: { // 获取sku列表配置项
        url: '/form/dynamicForm/formFieldConf',
        needLogin: true
    },
    getDataList: { // 获取sku列表数据
        url: '/form/dynamicForm/formDataList',
        needLogin: true
    },
    getExportList: { // 导出表单数据
        url: '/form/dynamicForm/exportFormData',
        needLogin: true
    },
    getFormData: { // 获取导入表单数据
        url: '/form/dynamicForm/importFormData',
        needLogin: true
    },
    saveFormFieldConf: {
        url: '/form/dynamicForm/saveFormFieldConf',
        needLogin: true
    },
    getTaskDetails: {
        url: '/taskcenter/task/detail',
        needLogin: true
    },
    getTemplate: { // 获取下载导入模版
        url: '/orderCenter/invoiceUpLoad/downLoadInvoiceTemplate',
        needLogin: true
    }
}
export default api
