import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    cities: [],
    points: [],
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
    },
    auth_error(state) {
      state.status = 'error';
    },
    upd_cities(state, payload) {
      state.cities = payload;
    },
    upd_points(state, payload) {
      state.points = payload;
    },
  },
  actions: {
    async login({ commit }) {
      commit('auth_request');
      const secret = process.env.VUE_APP_SECRET;
      const basic = Buffer.from(`11d7c9f` + ':' + secret).toString('base64');
      try {
        let resp = await axios({
          method: 'post',
          url: '/auth/login',
          data: {
            username: 'intern',
            password: 'intern-S!',
          },
          headers: {
            Authorization: `Basic ${basic}`,
          },
        });

        const token = resp.data.access_token;
        const refreshToken = resp.data.refresh_token;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        commit('auth_success', token);
      } catch (error) {
        console.log(error);
        commit('auth_error');
        localStorage.removeItem('token');
      }
    },
    async getCities({ commit }) {
      try {
        let city = await axios({
          method: 'get',
          url: '/db/city',
        });
        if (city.data.data) {
          commit('upd_cities', city.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getPoints({ commit }) {
      try {
        let point = await axios({
          method: 'get',
          url: '/db/point',
        });
        if (point.data.data) {
          commit('upd_points', point.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  modules: {},
});
