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
    cars: {
      status: '',
      list: [],
      categories: [],
    },
    stepOneData: {
      cities: [],
      points: [],
      status: '',
    },
    stepThreeData: {
      rates: [],
      status: '',
    },
    orderDetails: {},
    stepsCompleted: {
      1: false,
      2: false,
      3: false,
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
    auth_success(state, token) {
      state.auth.status = 'success';
      state.token = token;
    },
    throw_error(state, payload) {
      let block = state[payload];
      block.status = 'error';
    },
    upd_cities(state, payload) {
      state.stepOneData.cities = payload;
    },
    upd_points(state, payload) {
      state.stepOneData.points = payload;
    },
    upd_cars(state, payload) {
      state.cars.list = payload;
    },
    upd_categories(state, payload) {
      state.cars.categories = payload;
    },
    upd_order_details(state, payload) {
      let merged = { ...state.orderDetails, ...payload };
      state.orderDetails = merged;
    },
    upd_steps(state, payload) {
      state.stepsCompleted[payload.step] = payload.formStatus;
    },
    upd_rates(state, payload) {
      state.stepThreeData.rates = payload;
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
        commit('throw_error', 'auth');
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
        commit('throw_error', 'stepOneData');
      } finally {
        commit('finish_loading', 'stepOneData');
      }
    },
    async getCars({ commit }) {
      commit('start_loading', 'cars');
      try {
        let cars = await axios({
          method: 'get',
          url: '/db/car',
        });
        if (cars.data.data) {
          commit('upd_cars', cars.data.data);
        }

        let category = await axios({
          method: 'get',
          url: '/db/category',
        });

        if (category.data.data) {
          commit('upd_categories', category.data.data);
        }
      } catch (error) {
        console.log(error);
        commit('throw_error', 'cars');
      } finally {
        commit('finish_loading', 'cars');
      }
    },
    async getStepThreeData({ commit }) {
      commit('start_loading', 'stepThreeData');
      try {
        let rate = await axios({
          method: 'get',
          url: '/db/rate',
        });
        if (rate.data.data) {
          commit('upd_rates', rate.data.data);
        }
      } catch (error) {
        console.log(error);
        commit('throw_error', 'stepThreeData');
      } finally {
        commit('finish_loading', 'stepThreeData');
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  modules: {},
});
