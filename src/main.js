import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
Vue.use(Vuetify)

import Vuex from "vuex";

Vue.use(Vuex);

import axios from 'axios'
axios.defaults.baseURL="/api";
Vue.prototype.$http = axios



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
