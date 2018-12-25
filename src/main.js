// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store/index.js'
import router from './router/index.js'
import VueRouter from 'vue-router'
import '../static/css/common.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
// 将axios挂载到原型上
Vue.prototype.$axios=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
