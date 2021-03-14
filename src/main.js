import Vue from 'vue';
import App from './App.vue';
import router from './routes/index'; // 通过this.$router访问路由器，通过this.$route访问当前路由
import '@/lib/common.css';
import echarts from "echarts";
import Mint from 'mint-ui';
import { Toast, MessageBox } from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios';

// 挂载axios
Vue.prototype.$axios = axios;

// 挂载mintUI
Vue.use(Mint);
Vue.prototype.$toast = Toast;
Vue.prototype.$alert = MessageBox;
// 挂载echarts
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

// Date Formatter
Date.prototype.Format = function(fmt) { 
  var o = {   
    "M+" : this.getMonth()+1, //月份   
    "d+" : this.getDate(), //日   
    "h+" : this.getHours(), //小时   
    "m+" : this.getMinutes(), //分   
    "s+" : this.getSeconds(), //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds() //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};

const VueInstance = new Vue({
  render: h => h(App),
  router
}).$mount('#app');

export { VueInstance };