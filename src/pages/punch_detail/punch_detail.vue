<template>
  <div class="punch_detail">
    <zs-nav-bar title="考勤详情"></zs-nav-bar>
    <div class="base_info_wrap">
      <div class="base_info_header">
        <div class="avatar">
          <img src="@/images/default_avatar.png" alt="" />
        </div>
        <div class="infos">
          <div class="name">{{ (punchDetail.classVo || {}).className }}</div>
          <div class="other">
            共{{ ((punchDetail.classVo || {}).studentList || []).length }}人
            {{ new Date(punchDetail.startTime).Format("yyyy/MM/dd hh:mm") }} -
            {{ new Date(punchDetail.endTime).Format("hh:mm") }}
          </div>
        </div>
        <div
          v-if="myUserId === (punchDetail.classVo || {}).ownerId"
          @click="showMenu"
          class="ellips"
        >
          <img src="@/images/ellips_gray.png" alt="" />
        </div>
      </div>
      <ul class="base_info_body">
        <li class="body_item">
          <span>班级总人数</span>
          <span>{{ ((punchDetail.classVo || {}).studentList || []).length }}人</span>
        </li>
        <li class="body_item">
          <span>打卡人数</span>
          <span>{{ (punchDetail.punchedList || []).length }}人</span>
        </li>
        <li class="body_item">
          <span>请假人数</span>
          <span>{{ (punchDetail.leavedList || []).length }}人</span>
        </li>
        <li class="body_item">
          <span>未打卡人数</span>
          <span>{{ (punchDetail.unPunchedList || []).length }}人</span>
        </li>
      </ul>
    </div>
    <div class="people_list_wrap">
      <div class="toggle_btns">
        <span
          @click="changeListType('PUNCHED')"
          :class="listType === 'PUNCHED' ? 'selected' : ''"
        >
          按时打卡 {{ (punchDetail.punchedList || []).length }}
        </span>
        <span
          @click="changeListType('LEAVE')"
          :class="listType === 'LEAVE' ? 'selected' : ''"
        >
          请假 {{ (punchDetail.leavedList || []).length }}
        </span>
        <span
          @click="changeListType('UNPUNCHED')"
          :class="listType === 'UNPUNCHED' ? 'selected' : ''"
        >
          未打卡 {{ (punchDetail.unPunchedList || []).length }}
        </span>
      </div>
      <ul class="people_list">
        <li v-for="stu in displayListByType" :key="stu.id" class="student">
          <div class="avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="student_info">
            <div class="name">{{ stu.realName }}</div>
            <div class="time">{{ stu.sno }}</div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
    <mt-actionsheet :actions="actionMenu" v-model="sheetVisible">
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
      punchDetail: {},
      classVo: {},
      sheetVisible: false,
      actionMenu: [
        {
          name: "删除次打卡",
          method: this.deletePunch
        }
      ],
      myUserId: "",
      listType: "PUNCHED" // 展示的列表 "PUNCHED" | "LEAVE" | "UNPUNCHED"
    };
  },
  computed: {
    displayListByType() {
      switch (this.listType) {
      case "PUNCHED":
        return this.punchDetail.punchedList;
      case "LEAVE":
        return this.punchDetail.leavedList;
      case "UNPUNCHED":
        return this.punchDetail.unPunchedList;
      default:
        return [];
      }
    }
  },
  mounted() {
    this.toastInstance = this.$toast({
      message: '加载中',
      duration: -1
    });
    const { id } = this.$route.query;
    Promise.all([
      PunchAPI.readPunch(id),
      PunchAPI.getPunchById(id),
      UserAPI.getMyUserInfo()
    ]).then((res) => {
      this.punchDetail = res[1].data;
      this.myUserId = res[2].data.id;
      this.toastInstance.close();
    });
  },
  methods: {
    showMenu: function() {
      this.sheetVisible = true;
    },
    deletePunch() {
      jsUtils.showAlert(
        "删除考勤记录",
        "确定要删除此次考勤记录吗？本记录删除后无法恢复！",
        null,
        null,
        () => {
          PunchAPI.deletePunch(this.punchVo.id).then(({ data }) => {
            if (data) {
              this.$toast("记录已删除");
              this.$router.back();
            } else {
              this.$toast("删除失败，请稍后再试");
            }
          });
        }
      );
    },
    changeListType(type) {
      this.listType = type;
    }
  }
};
</script>

<style src="./punch_detail.css" scoped></style>
