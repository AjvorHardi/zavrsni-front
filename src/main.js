import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router/index';
import { store } from './store';
import HTTP from './services/BaseService';

Vue.use(Vuex);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  created() {
    const TOKEN = window.localStorage.getItem('token');
    if (!TOKEN) {
      return;
    }

    HTTP.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  },
  render: h => h(App),
}).$mount('#app')
