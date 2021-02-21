<template>
  <div class="login_container">
    <div
      class="logo"
      :style="{
        top:
          mode === 'login'
            ? 'calc((100vh - 360px) / 2)'
            : 'calc((100vh - 480px) / 2)',
      }"
    >
      <div class="logo_img">
        <img src="@/images/logo.png" alt="" />
      </div>
      <h1 class="product_name">准时课堂</h1>
      <h2 class="product_intro">
        ——更加
        <span> 智能 | 快捷 | 方便 </span>
        的考勤方式
      </h2>
    </div>
    <div class="table_box">
      <div
        class="form_list"
        :style="{ height: mode === 'login' ? '170px' : '425px' }"
      >
        <div class="table_line">
          <div class="table_name">手机号</div>
          <div class="table_input">
            <input
              type="number"
              :placeholder="
                mode === 'login' ? '请输入手机号登录' : '请输入手机号'
              "
            />
          </div>
        </div>
        <div class="table_line">
          <div class="table_name">密码</div>
          <div class="table_input">
            <input type="password" placeholder="请输入密码" />
          </div>
        </div>
        <div v-show="mode != 'login'" class="table_line">
          <div class="table_name">确认密码</div>
          <div class="table_input">
            <input type="password" placeholder="请再次输入密码" />
          </div>
        </div>
        <div v-show="mode != 'login'" class="table_line">
          <div class="table_name">选择身份</div>
          <div @click="showModal" class="table_input selector">
            <input
              v-model="chineseRole"
              type="text"
              placeholder="请选择您的身份"
              readonly
            />
          </div>
        </div>
        <div v-show="mode != 'login'" class="table_line">
          <div class="table_name">验证码</div>
          <div class="table_input">
            <input type="text" placeholder="请输入验证码" />
          </div>
        </div>
      </div>
      <div v-if="mode === 'login'" class="blue_btn" style="margin-top: 20px">
        <span>忘记密码</span>
      </div>
      <zs-button style="width: 100%; margin: 16px 0">
        {{ mode === "login" ? "立即登录" : "立即注册" }}
      </zs-button>
      <div class="blue_btn" style="margin-bottom: 12px">
        {{ mode === "login" ? "还没有账号？" : "已有账号？" }}
        <span @click="toggleMode">
          {{ mode === "login" ? "立即注册" : "去登录" }}
        </span>
      </div>
    </div>
    <!-- 选择身份弹窗 -->
    <transition name="fade">
      <div @click="closeModal" v-show="isShowModal" class="select_role_modal">
        <div class="role_container">
          <div @click="setRole('teacher')" class="role_type">教师</div>
          <div @click="setRole('student')" class="role_type">学生</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
export default {
  components: { zsButton: ZsButtonVue },
  data() {
    return {
      mode: "login",
      isShowModal: false,
      role: ""
    };
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === "login" ? "register" : "login";
    },
    showModal() {
      this.isShowModal = true;
    },
    closeModal() {
      this.isShowModal = false;
    },
    setRole(role) {
      this.role = role;
      this.closeModal();
    }
  },
  computed: {
    chineseRole() {
      switch (this.role) {
      case "teacher":
        return "教师";
      case "student":
        return "学生";
      default:
        return "";
      }
    }
  }
};
</script>

<style src="./login.css" scoped></style>