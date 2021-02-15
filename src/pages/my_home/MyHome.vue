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
        <li @click="goUpdate('realName')" class="item">
            <span class="title">姓名</span>
            <div class="content">王小明</div>
            <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="">
            </div>
        </li>
        <li @click="goUpdate('userNo')" class="item">
            <span class="title">学号</span>
            <div class="content">P171713280</div>
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
        <li @click="goUpdate('phone')" class="item">
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

export default {
  components: { zsNavBar: ZsNavBarVue, homeFooter: HomeFooterVue },
  methods: {
    goUpdate(type) {
      this.$router.push("/updateUserInfo?type=" + type);
    }
  }
};
</script>

<style src="./MyHome.css" scoped></style>