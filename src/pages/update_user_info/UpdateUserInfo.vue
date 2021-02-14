<template>
  <div class="update">
    <zs-nav-bar :title="`修改${title}`"></zs-nav-bar>
    <ul class="chunk">
      <!-- 密码 -->
      <template v-if="type === 'password'">
        <li class="item">
          <div class="title">原密码</div>
          <input type="password" />
          <div class="tip">原密码错误</div>
        </li>
        <li class="item">
          <div class="title">新密码</div>
          <input type="password" />
          <div class="tip"></div>
        </li>
        <li class="item">
          <div class="title">确认密码</div>
          <input type="password" />
          <div class="tip"></div>
        </li>
      </template>
      <!-- other -->
      <li v-else class="item">
        <div class="title">{{ title }}</div>
        <input type="text" />
        <div class="tip"></div>
      </li>
    </ul>
    <zs-button
      style="
        width: 289px;
        height: 43px;
        position: fixed;
        bottom: 47px;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      "
      :shadow="true"
      >提交</zs-button
    >
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
export default {
  components: { zsNavBar: ZsNavBarVue, zsButton: ZsButtonVue },
  data() {
    return {
      title: "",
      type: ""
    };
  },
  mounted() {
    const { type } = this.$route.query;
    this.type = type;
    switch (type) {
    case "realName":
      this.title = "姓名";
      break;
    case "password":
      this.title = "密码";
      break;
    case "userNo":
      this.title = "学号";
      break;
    case "phone":
      this.title = "手机号";
      break;
    default:
      break;
    }
  }
};
</script>

<style src="./UpdateUserInfo.css" scoped></style>