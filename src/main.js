import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
Vue.use(Vuetify)

import Vuex from "vuex";

Vue.use(Vuex);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')