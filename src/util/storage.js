
const storeName = '__KTSystemSetupStore__'

// 定义存取localStorage的方法
const saveToLocal = (storageType, id, key, value) => {
    let store = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    let thisStore = store[storeName]
    if (!thisStore) {
        thisStore = {}
        thisStore[id] = {}
        thisStore[id][key] = value
    } else {
        thisStore = JSON.parse(thisStore)
        if (!thisStore[id]) {
            thisStore[id] = {}
        }
    }
    thisStore[id][key] = value
    store[storeName] = JSON.stringify(thisStore)
}
// def 为默认数据
const getFromLocal = (storageType, id, key, def) => {
    let store = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    let thisStore = store[storeName]
    if (!thisStore) {
        return def
    }
    thisStore = JSON.parse(thisStore)[id]
    if (!thisStore) {
        return def
    }
    if (thisStore[key] === 'undefined') {
        return def
    }
    return thisStore[key] || def
}

export {
    saveToLocal,
    getFromLocal
}
