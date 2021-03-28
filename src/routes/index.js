import Vue from 'vue';
import VueRouter from 'vue-router';
import { Toast } from 'mint-ui';
Vue.use(VueRouter);

import Home from '@/pages/home/Home';
import axios from 'axios';
/* lazy load. */
const AddressHome = () => import(/* webpackChunkName: "AddressHome" */'@/pages/address_home/AddressHome');
const MessageHome = () => import(/* webpackChunkName: "MessageHome" */'@/pages/message_home/MessageHome');
const MyHome = () => import(/* webpackChunkName: "MyHome" */'@/pages/my_home/MyHome');
const UpdateUserInfo = () => import(/* webpackChunkName: "UpdateUserInfo" */'@/pages/update_user_info/UpdateUserInfo');
const PunchHome = () => import(/* webpackChunkName: "PunchHome" */'@/pages/punch_home/punch_home');
const PunchStatistic = () => import(/* webpackChunkName: "PunchStatistic" */'@/pages/punch_statistic/punch_statistic');
const PunchDetail = () => import(/* webpackChunkName: "PunchDetail" */'@/pages/punch_detail/punch_detail');
const InfoPage = () => import(/* webpackChunkName: "InfoPage" */'@/pages/info_page/info_page');
const CreateClass = () => import(/* webpackChunkName: "CreateClass" */'@/pages/create_class/create_class');
const Login = () => import(/* webpackChunkName: "Login" */'@/pages/login/login');
const ChatPage = () => import(/* webpackChunkName: "chatPage" */'@/pages/chat_page/chat_page');

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/addressHome', name: 'addressHome', component: AddressHome },
  { path: '/messageHome', name: 'messageHome', component: MessageHome },
  { path: '/myHome', name: 'myHome', component: MyHome },
  { path: '/updateUserInfo', name: 'updateUserInfo', component: UpdateUserInfo },
  { path: '/punchHome', name: 'punchHome', component: PunchHome },
  { path: '/punchStatistic', name: 'punchStatistic', component: PunchStatistic },
  { path: '/punchDetail', name: 'punchDetail', component: PunchDetail },
  { path: '/infoPage', name: 'infoPage', component: InfoPage },
  { path: '/createClass', name: 'createClass', component: CreateClass },
  { path: '/login', name: 'login', component: Login },
  { path: '/chatPage', name: 'chatPage', component: ChatPage }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 除登录页以外都要进行登录验证
router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    axios.post('/api/user/checkLogin').then((res) => {
      if (res.data === 'OK') {
        next();
      } else {
        Toast("登录失效，请重新登录");
        next({ name: 'login' });
      }
    }).catch(() => {
      Toast("登录失效，请重新登录");
      next({ name: 'login' });
    });
  } else {
    next();
  }
});

export default router;
