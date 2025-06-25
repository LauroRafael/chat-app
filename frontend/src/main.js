import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
