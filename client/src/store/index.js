import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user ? true : false;
    },
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const { data } = await Vue.prototype.$http.post(
          '/api/login',
          credentials
        );
        commit('setUser', data);
      } catch (err) {
        throw err.response.data;
      }
    },
    async getUser({ commit }) {
      try {
        const { data } = await Vue.prototype.$http.get('/api/user/me');
        commit('setUser', data);
      } catch (err) {
        console.log(err.response.data);
      }
    },
    async logoutUser({ commit }) {
      commit('setUser', null);
    },
    async registerUser({ commit }, credentials) {
      try {
        const { data } = await Vue.prototype.$http.post(
          '/api/register',
          credentials
        );

        commit('setUser', data);
      } catch (err) {
        throw err.response.data;
      }
    },
  },
  modules: {},
});
