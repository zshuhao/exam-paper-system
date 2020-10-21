import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import app from './modules/app'
import getters from './getters'
Vue.use(Vuex)

const state = () => ({
    token: '',
    ktToken: '',
    menus: [],
    userInfo: {}
})

const actions = {
    // tag
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
        cart,
        app
    },
    state,
    getters,
    actions,
    mutations
})
