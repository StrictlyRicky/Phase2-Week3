import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: null,
    token: "",
    room: {}
  },
  mutations: {
    login(state, payload) {
      const { username, token } = payload;
      state.username = username;
      state.token = token;
    },
    logout(state) {
      state.username = null;
    },
    setRoom(state, room) {
      state.room = room;
    }
  },
  actions: {},
  modules: {}
});
