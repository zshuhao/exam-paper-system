
const state = {
    sidebar: true
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar = !state.sidebar
    }
}

const actions = {
    toggleSideBar ({ commit }) {
        commit('TOGGLE_SIDEBAR')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
