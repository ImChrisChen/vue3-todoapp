import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0,
  },
  mutations: {},
  actions: {},
  modules: {},
})

window.store = store

export default store
