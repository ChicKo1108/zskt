import Vue from 'vue';
import App from './App.vue';
import router from './routes/index'; // 通过this.$router访问路由器，通过this.$route访问当前路由
import '@/lib/common.css';
import echarts from "echarts";
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios';

// 挂载axios
Vue.prototype.$axios = axios;

// 挂载mintUI
Vue.use(Mint);
// 挂载echarts
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
