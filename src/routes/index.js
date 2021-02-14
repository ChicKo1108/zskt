import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '@/pages/home/Home';
/* lazy load. */
const AddressHome = () => import(/* webpackChunkName: "address" */'@/pages/address_home/AddressHome');
const MessageHome = () => import(/* webpackChunkName: "message" */'@/pages/message_home/MessageHome');
const MyHome = () => import(/* webpackChunkName: "my" */'@/pages/my_home/MyHome');
const UpdateUserInfo = () => import(/* webpackChunkName: "UpdateUserInfo" */'@/pages/update_user_info/UpdateUserInfo');

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/addressHome', name: 'addressHome', component: AddressHome },
  { path: '/messageHome', name: 'messageHome', component: MessageHome },
  { path: '/myHome', name: 'myHome', component: MyHome },
  { path: '/updateUserInfo', name: 'updateUserInfo', component: UpdateUserInfo }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
