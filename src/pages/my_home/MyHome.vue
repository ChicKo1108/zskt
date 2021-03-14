<template>
  <div class="my_home">
    <zs-nav-bar type="simple" title="我的"></zs-nav-bar>
    <ul class="chunk">
        <li class="item">
            <span class="title">头像</span>
            <div class="content avatar">
                <img src="@/images/default_avatar.png" alt="">
            </div>
            <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="">
            </div>
        </li>
        <li @click="goUpdate('realName', realName)" class="item">
            <span class="title">姓名</span>
            <div class="content">{{realName}}</div>
            <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="">
            </div>
        </li>
        <li v-if="role==='STUDENT'" @click="goUpdate('sno', sno)" class="item">
            <span class="title">学号</span>
            <div class="content">{{sno}}</div>
            <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="">
            </div>
        </li>
    </ul>
    <ul class="chunk">
        <li @click="goUpdate('password')" class="item">
            <span class="content" style="font-size:14px;">修改密码</span>
            <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="">
            </div>
        </li>
        <li @click="goUpdate('phone', phone)" class="item">
            <span class="content" style="font-size:14px;">修改手机号</span>
            <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="">
            </div>
        </li>
    </ul>
    <ul class="chunk">
        <li class="item simple_btn">关于准时课堂</li>
        <li class="item simple_btn">退出登录</li>
    </ul>
    <home-footer :index="4"></home-footer>
  </div>
</template>

<script>
import HomeFooterVue from "../../components/home_footer/HomeFooter.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import UserAPI from "../../api/userAPI.js";

export default {
  components: { zsNavBar: ZsNavBarVue, homeFooter: HomeFooterVue },
  data() {
    return {
      realName: '',
      avatar: '',
      phone: '',
      sno: '',
      role: ''
    };
  },
  mounted() {
    UserAPI.getMyUserInfo().then(res => {
      const {realName, avatar, phone, sno, role} = res.data;
      this.realName = realName;
      this.avatar = avatar;
      this.phone = phone;
      this.sno = sno;
      this.role = role;
    });
  },
  methods: {
    goUpdate(type, value) {
      this.$router.push("/updateUserInfo?type=" + type + "&value=" + value);
    }
  }
};
</script>

<style src="./MyHome.css" scoped></style>