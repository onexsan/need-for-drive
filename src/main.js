import Vue from 'vue';
import router from './router';
import App from './App.vue';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import EasySlider from 'vue-easy-slider';
Vue.use(EasySlider);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = `https://api-factory.simbirsoft1.com/api`;
axios.defaults.headers.common['X-Api-Factory-Application-Id'] =
  '5e25c641099b810b946c5d5b';

Vue.use(VueAxios, axios);

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
