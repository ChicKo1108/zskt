<template>
  <div class="update">
    <zs-nav-bar :title="`修改${title}`"></zs-nav-bar>
    <ul class="chunk">
      <!-- 密码 -->
      <template v-if="type === 'password'">
        <li class="item">
          <div class="title">原密码</div>
          <input @blur="doCheckPassword" v-model="oriPassword" type="password" />
          <div :hidden="!isOriPsdWrong" class="tip">原密码错误</div>
        </li>
        <li class="item">
          <div class="title">新密码</div>
          <input v-model="password" type="password" />
        </li>
        <li class="item">
          <div class="title">确认密码</div>
          <input v-model="checkPassword" type="password" />
        </li>
      </template>
      <!-- other -->
      <li v-else class="item">
        <div class="title">{{ title }}</div>
        <input v-model="info" type="text" />
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
      :onClick="doUpdate"
      >提交</zs-button
    >
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import UserAPI from "../../api/userAPI";
export default {
  components: { zsNavBar: ZsNavBarVue, zsButton: ZsButtonVue },
  data() {
    return {
      title: "",
      type: "",
      info: "",
      oriPassword: "",
      password: "",
      checkPassword: "",
      isOriPsdWrong: false
    };
  },
  mounted() {
    const { type, value } = this.$route.query;
    this.type = type;
    this.title = this.getKeyByType(type);
    this.info = value;
  },
  methods: {
    getKeyByType(type) {
      switch (type) {
      case "realName":
        return "姓名";
      case "password":
        return "密码";
      case "sno":
        return "学号";
      case "phone":
        return "手机号";
      default:
        break;
      }
    },
    doCheckPassword() {
      if(!this.oriPassword) {
        return;
      }
      UserAPI.checkPassword(this.oriPassword).then(res => {
        if(!res.data) {
          this.isOriPsdWrong = true;
        } else {
          this.isOriPsdWrong = false;
        }
      });
    },
    doUpdate() {
      if(this.type !== "password") {
        if(!this.info) {
          this.$toast(`请输入${this.getKeyByType(this.type)}后再提交`);
          return;
        }
        UserAPI.updateUserInfo({[this.type]: this.info}).then(res => {
          if(res.data) {
            this.$toast('修改成功');
            this.$router.back();

          }
        });
      } else {
        if(this.password !== this.checkPassword) {
          this.$toast('两次密码输入不一致！');
          return;
        } else if(this.isOriPsdWrong) {
          this.$toast('原密码输入不正确');
          return;
        } else {
          UserAPI.updatePassword(this.oriPassword, this.password, this.checkPassword).then(res => {
            if(res.data === 'OK') {
              this.$toast('修改成功');
              this.$router.back();
            } else {
              this.$toast('出错啦，请重试');
            }
          });
        }
      }
    }
  }
};
</script>

<style src="./UpdateUserInfo.css" scoped></style>