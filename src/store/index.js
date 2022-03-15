import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      status: '',
    },
    token: localStorage.getItem('token') || '',
    stepOneData: {
      cities: [],
      points: [],
      status: '',
    },
  },
  mutations: {
    start_loading(state, payload) {
      let block = state[payload];
      block.status = 'loading';
    },
    finish_loading(state, payload) {
      let block = state[payload];
      block.status = '';
    },
    error_loading(state, payload) {
      let block = state[payload];
      block.status = 'error';
    },
    auth_success(state, token) {
      state.auth.status = 'success';
      state.token = token;
    },
    upd_cities(state, payload) {
      state.stepOneData.cities = payload;
    },
    upd_points(state, payload) {
      state.stepOneData.points = payload;
    },
  },
  actions: {
    async login({ commit }) {
      commit('start_loading', 'auth');
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
        commit('error_loading', 'auth');
        localStorage.removeItem('token');
      }
    },
    async getStepOneData({ commit }) {
      commit('start_loading', 'stepOneData');
      try {
        let city = await axios({
          method: 'get',
          url: '/db/city',
        });
        if (city.data.data) {
          commit('upd_cities', city.data.data);
        }

        let point = await axios({
          method: 'get',
          url: '/db/point',
        });
        if (point.data.data) {
          commit('upd_points', point.data.data);
        }
      } catch (error) {
        console.log(error);
        commit('error_loading', 'stepOneData');
      } finally {
        commit('finish_loading', 'stepOneData');
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  modules: {},
});
