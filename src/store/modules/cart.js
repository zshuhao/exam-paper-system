
// initial state
const state = () => ({
    items: [1, 2]
})

// getters
const getters = {
    // cartProducts: (state, getters, rootState) => {
    //     return state.items.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // }
}

// actions
const actions = {
    // checkout ({ commit, state }, products) {
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    // }
}

// mutations
const mutations = {

    // setCheckoutStatus (state, status) {
    //     state.checkoutStatus = status
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
