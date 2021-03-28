<template>
  <div class="message_home">
    <zs-nav-bar title="消息" type="simple"></zs-nav-bar>
    <!-- 搜索框 -->
    <div class="search_bar">
      <div class="search_box">
        <img src="@/images/search.png" alt="" />
        <input type="text" placeholder="搜索" />
      </div>
    </div>
    <!-- 消息列表 -->
    <ul class="message_list">
      <li @click="viewChat" class="list_item flx flx-startX">
        <div class="avatar">
          <img src="@/images/default_avatar.png" alt="" />
        </div>
        <div class="message_detail flx-col flx-sbX">
          <div class="base_info flx flx-sbX">
            <div class="name">王小明 · P171713280</div>
            <div class="time">上午10:38</div>
          </div>
          <div class="info_content one-line-text">
            李老师，您好，这是我的请假申请，请您审批。李老师，您好，这是我的请假申请，请您审批。
          </div>
        </div>
        <div class="unread_num">8</div>
      </li>
    </ul>
    <home-footer :index="1"></home-footer>
  </div>
</template>

<script>
import ZsNavBar from "../../components/zs_nav_bar/ZsNavBar";
import HomeFooter from "@/components/home_footer/HomeFooter";

export default {
  components: { ZsNavBar, HomeFooter },
  data() {
    return {
      
    };
  },
  methods: {
    viewChat() {
      this.$router.push('/chatPage');
    }
  }
};
</script>

<style src="./MessageHome.css" scoped></style>