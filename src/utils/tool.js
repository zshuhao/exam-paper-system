
/**
 * 根据 id pid 将数组树形化
 * @param {array} data 需要处理的数组
 * @param {any} pid 最外层id
 */
const formatTree = (data, pid) => {
    const obj = {}
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
    const d = data.filter((item) => {
        if (item.pid === pid) {
            return true
        }
    })
    return d
}

export {
    formatTree
}
