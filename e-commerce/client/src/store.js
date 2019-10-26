import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    products: []
  },
  mutations: {
    LOGOUT(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
    LOGIN(state, user) {
      state.user = user
    },
    FETCHPRODUCT(state, products) {
      state.products = products
    }
  },
  actions: {
    refresh({ commit }) {
      if (localStorage.getItem("token")) {
        Axios({
          method: "post",
          url: "http://shopify-server.ricky-works.online/user/refresh",
          headers: { token: localStorage.getItem("token") }
        })
          .then(({ data }) => {
            commit("LOGIN", data)
          })
          .catch(console.log);
      }
    },
    fetchProducts({ commit }) {
      Axios({
        method: "get",
        url: "http://shopify-server.ricky-works.online/product",
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          commit("FETCHPRODUCT", data);
        })
        .catch(console.log);
    }
  }
})
