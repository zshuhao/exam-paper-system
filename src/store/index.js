import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import app from './modules/app'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const dataState = createPersistedState({
    key: 'exam-paper-system-vuex',
    paths: ['token', 'userInfo']
})

const state = () => ({
    token: {},
    userInfo: {}
})

const actions = {
    setToken ({ commit }, payload) {
        commit('SETTOKEN', payload)
    },
    setUserInfo ({ commit }, payload) {
        commit('SETUSERINFO', payload)
    }
}
const mutations = {
    SETTOKEN (state, payload) {
        state.token = payload
    },
    SETUSERINFO (state, payload) {
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
    mutations,
    plugins: [dataState]
})
