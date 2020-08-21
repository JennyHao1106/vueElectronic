import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import http from './untils/http'
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
const Bus = new Vue();
Vue.prototype.$http = http;
Vue.prototype.$bus = Bus;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
