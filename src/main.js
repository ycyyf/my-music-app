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
import VueLazyload from 'vue-lazyload'
// import {Loading} from 'element-ui'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueLazyload,{
  loading:require("./assets/default.png")
})

// 将axios挂载到原型上
Vue.prototype.$axios=axios;

// var loadinginstance;
//设置请求头
// axios.defaults.headers={
//   "Content-Type":"application/x-www-form-urllencoded"
// }
// //处理请求数据
// axios.defaults.transformRequest=[function(data){
//   let newData="";
//   for(let k in data)
//   {
//     newData+=encodeURIComponent(k)+"="+encodeURIComponent(data[k])+"&";
//   }
//   return newData;
// }]
//添加请求拦截器，加载动画
// axios.interceptors.request.use(config=>{
//   //在发送请求之前设置loading动画显示
//   loadinginstance=Loading.service({
//     lock: true,
//     text: '加载中……',
//     background: 'rgba(0, 0, 0, 0.7)',
//     fullscreen:true
//   });  
//   // console.log("加载中...")
//   return config;
// },error=>{
//   //请求错误时做某些事
//   return Promise.reject(error);
// })
// //添加响应拦截器
// axios.interceptors.response.use(response=>{
//   //关掉加载动画 
//   loadinginstance.close();
//   return response;
// },error=>{
//   //请求错误时
//   return Promise.reject(error);
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>'
})
