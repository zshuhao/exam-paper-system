import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'

Vue.use(Vuex)

const state = () => ({
    token: '',
    ktToken: '',
    menus: [],
    userInfo: {}
})
const getters = {
    getToken (state) {
        return state.token
    },
    getKtToken (state) {
        return state.ktToken
    },
    getMenus (state) {
        return state.menus
    },
    getUserInfo (state) {
        return state.userInfo
    }
}
const actions = {
    setKtToken ({ commit }, payload) {
        commit('setKtToken', payload)
    },
    setToken ({ commit }, payload) {
        commit('setToken', payload)
    },
    setMenus ({ commit }, payload) {
        commit('setMenus', payload)
    },
    setUserInfo ({ commit }, payload) {
        commit('setUserInfo', payload)
    }
}
const mutations = {
    setKtToken (state, payload) {
        state.ktToken = payload
    },
    setToken (state, payload) {
        state.token = payload
    },
    setMenus (state, payload) {
        state.menus = [...payload]
    },
    setUserInfo (state, payload) {
        state.userInfo = { ...payload }
    }
}

export default new Vuex.Store({
    modules: {
        cart
    },
    state,
    getters,
    actions,
    mutations
})
