<template>
  <div class="info_page">
    <div class="nav_bar">
      <div @click="$router.back()" class="nav_bar_icon">
        <img src="@/images/arrow-left-white.png" alt="" />
      </div>
      <div v-if="mode === 'class' && myUserInfo.id === classVo.ownerId" class="nav_bar_icon">
        <img src="@/images/edit_icon.png" alt="" />
      </div>
    </div>
    <div class="header">
      <div class="bottom_border"></div>
      <div class="info">
        <div class="avatar">
          <img src="@/images/default_avatar.png" alt="" />
        </div>
        <div class="infos">
          <div class="info_name">
            {{
              mode === "class"
                ? `${classVo.className}(${(classVo.studentList||[]).length})`
                : userVo.realName
            }}
          </div>
          <div class="info_id">
            {{ mode === "stu" ? "用户" : "班级" }}id: {{ id }}
          </div>
        </div>
      </div>
    </div>
    <!-- 班级档案 -->
    <div v-if="mode === 'class'" class="statistic_block class_card">
      <div class="table">
        <div class="row">
          <div class="cell">班级档案</div>
        </div>
        <div class="row">
          <div class="cell">班级名称</div>
          <div class="cell">{{ classVo.className }}</div>
        </div>
        <div class="row">
          <div class="cell">班级人数</div>
          <div class="cell">{{ (classVo.studentList||[]).length }}人</div>
        </div>
        <div class="row">
          <div class="cell">所属学校</div>
          <div class="cell">{{ classVo.school }}</div>
        </div>
        <div class="row">
          <div class="cell">所属学院</div>
          <div class="cell">{{ classVo.school }}</div>
        </div>
      </div>
    </div>
    
    <div class="options_bar">
      <!-- 学生身份 + 已加入班级 或者 老师身份-->
      <zs-button v-if="hasJoinedClass || myUserInfo.role === 'TEACHER'" class="options_btn">进入群聊</zs-button>
      <zs-button
        v-if="hasJoinedClass && myUserInfo.role === 'STUDNET'"
        type="danger"
        class="options_btn"
      >
        退出班级
      </zs-button>
      <!-- 学生身份 + 未加入班级 -->
      <zs-button :onClick="applyAddClass" v-if="myUserInfo.role === 'STUDNET' && !hasJoinedClass">
        加入班级
      </zs-button>
      <!-- 老师身份 -->
      <zs-button
        v-if="mode === 'class' && myUserInfo.id === classVo.ownerId"
        type="danger"
        class="options_btn"
      >
        解散班级
      </zs-button>
    </div>
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
import classAPI from "../../api/classAPI.js";
import userAPI from "../../api/userAPI.js";
export default {
  components: { zsButton: ZsButtonVue },
  data() {
    return {
      isShowTip: false,
      mode: "",
      id: "",
      classVo: {},
      hasJoinedClass: false,
      myUserInfo: {},
      userVo: {}
    };
  },
  mounted() {
    const { id, mode } = this.$route.query;
    this.id = id;
    this.mode = mode;
    if (mode === "class") {
      Promise.all([classAPI.findById(id), userAPI.getMyUserInfo()]).then(
        (res) => {
          if (res[0].data.msg === "OK") {
            const classVo = res[0].data.data;
            const myUserInfo = res[1].data;
            this.classVo = classVo;
            if (myUserInfo.role === "STUDENT" && classVo.studentList.find((stu) => stu.id === myUserInfo.id)) {
              this.hasJoinedClass = true;
            }
            this.myUserInfo = myUserInfo;
          } else if (res[0].data.msg === "NOT_FOUND") {
            this.$alert({
              title: "未找到此班级",
              message: "此班级可能已被删除，请联系相关老师或客服",
              showCancelButton: false,
              confirmButtonText: "我知道了"
            }).then(() => {
              this.$router.back();
            });
          }
        }
      );
    } else {
      Promise.all([userAPI.findUserById(id), userAPI.getMyUserInfo()]).then((res) => {
        this.userVo = res[0].data;
        this.myUserInfo = res[1].data;
      });
    }
  },
  methods: {
    toggleTip() {
      this.isShowTip = !this.isShowTip;
    },
    applyAddClass() {
      classAPI.apply2AddClass(this.id).then((res) => {
        if(res.data === 'ALREADY_JOINED') {
          this.$toast('您已经在此班级当中');
        } else {
          this.$toast('申请已发送，请等待老师审批');
        }
      });
    }
  }
};
</script>

<style src="./info_page.css" scoped></style>
