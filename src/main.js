import Vue from 'vue';
import App from './App.vue';
import router from './routes/index'; // 通过this.$router访问路由器，通过this.$route访问当前路由
import '@/utils/common.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
