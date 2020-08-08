import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: {
      isThere: false,
      text: '',
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user ? true : false;
    },
    error(state) {
      return state.error;
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
    logoutUser({ commit }) {
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
    setError({ commit }, error) {
      const errorMessage = {
        isThere: error.isThere,
        text: error.text.message || error.text.error,
      };
      commit('setError', errorMessage);
    },
  },
  modules: {},
});
