export const state = () => ({
    visibleCart:  false,
})

export const mutations = {
    changeVisibleCart (state) {
        state.visibleCart = true;
    },
    unvisibleCart (state) {
        state.visibleCart = false;
    }
}

export const getters = {
   visibleCart(state) {
      return state.visibleCart;
   }
  
}

export const actions = {
  changeVisibleCart({commit}) {
    commit('changeVisibleCart');
  },
  unvisibleCart({commit}) {
    commit('unvisibleCart');
  }
}


