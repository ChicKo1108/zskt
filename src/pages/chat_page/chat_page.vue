<template>
  <div class="chat_page">
    <zs-nav-bar title="软件1班"></zs-nav-bar>
    <div class="message_box">
      <div class="message">
        <div class="avatar"><img src="@/images/default_avatar.png" alt=""></div>
        <div class="block">
          <div class="info">王小明 2021/03/20</div>
          <div class="msg">老师对不起，我睡过头了！</div>
        </div>
      </div>
      <div class="message">
        <div class="avatar"><img src="@/images/default_avatar.png" alt=""></div>
        <div class="block">
          <div class="info">王小明 2021/03/20</div>
          <div class="msg">老师对不起，我睡过头了！老师对不起，我睡过头了！老师对不起，我睡过头了！</div>
        </div>
      </div>

      <div class="message me">
        <div class="block">
          <div class="info">王小明 2021/03/20</div>
          <div class="msg">老师对不起，我睡过头了！老师对不起，我睡过头了！老师对不起，我睡过头了！老师对不起，我睡过头了！</div>
        </div>
        <div class="avatar"><img src="@/images/default_avatar.png" alt=""></div>
      </div>
    </div>
    <div class="foot_bar">
      <div class="input"><textarea /></div>
      <div class="button">发送</div>
    </div>
  </div>
</template>

<script>
import ZsNavBarVue from '../../components/zs_nav_bar/ZsNavBar.vue';
export default {
  components: {
    zsNavBar: ZsNavBarVue
  }
};
</script>

<style src="./chat_page.css" scoped></style>