export const state = () => ({
     cartRolls: [],
     sumAllRolls: 0
})

export const mutations = {
     addRollToCart(state, roll) {
          
          const needRoll = state.cartRolls.find(item => item.id === roll.id);
          if(needRoll) {
               needRoll.quantity++;
          } else {
               state.cartRolls.push(roll);
          }
     },
     removeRollFromCart(state, roll) {
          const rollId = roll.id;
          if(roll.quantity > 1) {
               roll.quantity--;
          } else {
               const index = state.cartRolls.findIndex(item => item.id === roll.id);
               state.cartRolls.splice(index, 1);
          }
     },
     deleteRollFromCart(state, roll) {
          const index = state.cartRolls.findIndex(item => item.id === roll.id);
          state.cartRolls.splice(index, 1);
     },
     setSumRolls(state) {
          state.sumAllRolls = state.cartRolls.reduce((acc, item) => {
               acc += item.price*item.quantity;
               return acc;
          }, 0)
     }
}

export const getters = {
     cartRolls(state) {
          return state.cartRolls;
     },
     sumAllRolls(state) {
          return state.sumAllRolls;
     }
}

export const actions = {
     addRollToCart({ commit }, roll) {
          commit('addRollToCart', roll)
     },
     removeRollFromCart({ commit }, roll) {
          commit('removeRollFromCart', roll)
     },
     deleteRollFromCart({ commit }, roll) {
          commit('deleteRollFromCart', roll)
     },
     setSumRolls({ commit}) {
          commit('setSumRolls')
     }
}