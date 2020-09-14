
/**
 * 根据 id pid 将数组树形化
 * @param {array} data 需要处理的数组
 * @param {any} pid 最外层id
 */
const formatTree = (data, pid) => {
    let obj = {}
    data.forEach((item) => {
        // 让obj中的‘item.id’属性指向data数组中的对象元素
        obj[item.id] = item
    })
    data.forEach((item) => {
        // 过滤掉元素的父节点id为0，（为0为最外层）
        if (item.pid !== pid) {
            // 根据pid在obj中寻找该元素的父级元素，判断父级元素有没有children，有就push进去，没有就为父元素添加children属性同时让该元素添加进去
            obj[item.pid].children
                ? obj[item.pid].children.push(item)
                : obj[item.pid].children = [item]
        }
    })

    // 最后过滤掉pid不等于0，只留下最外层
    let d = data.filter((item) => {
        if (item.pid === pid) {
            return true
        }
    })
    return d
}

/**
 * 解析url中的参数
 * @example ?id=1232&name=jack
 * retrun Object {id:1231,name:'jack'}
 */
const urlParse = (url) => {
    url = url || window.location.search
    let obj = {}
    // 一般来说，末尾不需要匹配#,但存在部分服务对哈希处理不好的情况
    let reg = /[?&][^?&]+=[^?&|#]+/g
    let arr = url.match(reg)
    if (!arr) return obj
    // ['id=1232','&name=jack']
    arr.forEach((item) => {
        let temp = item.substr(1).split('=')
        let key = decodeURIComponent(temp[0])
        let val = decodeURIComponent(temp[1])
        obj[key] = val
    })
    // console.log(obj)
    return obj
}

export {
    formatTree,
    urlParse
}
