<template>
  <div class="punch_detail">
    <zs-nav-bar title="考勤详情"></zs-nav-bar>
    <div class="base_info_wrap">
      <div class="base_info_header">
        <div class="avatar">
          <img src="@/images/default_avatar.png" alt="" />
        </div>
        <div class="infos">
          <div class="name">{{ classVo.className }}</div>
          <div class="other">
            共{{ (classVo.studentList || []).length }}人
            {{ new Date(punchVo.startTime).Format("yyyy/MM/dd hh:mm") }} -
            {{ new Date(punchVo.endTime).Format("hh:mm") }}
          </div>
        </div>
        <div v-if="myUserId===classVo.ownerId" @click="showMenu" class="ellips">
          <img src="@/images/ellips_gray.png" alt="" />
        </div>
      </div>
      <ul class="base_info_body">
        <li class="body_item"><span>班级总人数</span><span>35人</span></li>
        <li class="body_item"><span>打卡人数</span><span>35人</span></li>
        <li class="body_item"><span>请假人数</span><span>35人</span></li>
        <li class="body_item"><span>未打卡人数</span><span>35人</span></li>
      </ul>
    </div>
    <div class="people_list_wrap">
      <div class="toggle_btns">
        <span class="selected">按时打卡 21</span>
        <span>请假 3</span>
        <span>未打卡 21</span>
      </div>
      <ul class="people_list">
        <li class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">王小明 · P17173280</div>
            <div class="time">2021/11/18 11:30打卡</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
        <li class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">王小明 · P17173280</div>
            <div class="time">2021/11/18 11:30打卡</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
        <li class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">王小明 · P17173280</div>
            <div class="time">2021/11/18 11:30打卡</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
        <li class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">王小明 · P17173280</div>
            <div class="time">2021/11/18 11:30打卡</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
        <li class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">王小明 · P17173280</div>
            <div class="time">2021/11/18 11:30打卡</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
        <li class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">王小明 · P17173280</div>
            <div class="time">2021/11/18 11:30打卡</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
    <mt-actionsheet
        :actions= "actionMenu"
        v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import PunchAPI from "../../api/punchAPI";
import UserAPI from "../../api/userAPI";
import jsUtils from "../../lib/jsUtils";

export default {
  components: { zsNavBar: ZsNavBarVue },
  data() {
    return {
      punchVo: {},
      classVo: {},
      sheetVisible: false,
      actionMenu: [
        {
          name: '删除次打卡',
          method: this.deletePunch
        }
      ],
      myUserId: ''
    };
  },
  mounted() {
    const { id } = this.$route.query;
    Promise.all([PunchAPI.readPunch(id), PunchAPI.getPunchById(id), UserAPI.getMyUserInfo()]).then(
      (res) => {
        this.punchVo = res[1].data.punchVo;
        this.classVo = res[1].data.classVo;
        this.myUserId = res[2].data.id;
      }
    );
  },
  methods: {
    showMenu: function(){
      this.sheetVisible = true;
    },
    deletePunch() {
      debugger;
      jsUtils.showAlert('删除考勤记录', '确定要删除此次考勤记录吗？本记录删除后无法恢复！', null, null , () => {
        PunchAPI.deletePunch(this.punchVo.id).then(({data}) => {
          if(data) {
            this.$toast('记录已删除');
            this.$router.back();
          } else {
            this.$toast('删除失败，请稍后再试');
          }
        });
      });
    }
  }
};
</script>

<style src="./punch_detail.css" scoped></style>
