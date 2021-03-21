<template>
  <div class="home">
    <div class="header">
      <h1>{{ localTime }}好，欢迎来到准时课堂！</h1>
      <p>——即刻体验更加高效、快捷的考勤方式</p>
    </div>
    <!-- 快捷考勤 -->
    <div v-if="userInfo.role === 'TEACHER'" class="card punch_card">
      <h2 class="card_title">快捷考勤</h2>
      <!-- 有班级状态 -->
      <div v-if="classVos && classVos.length" class="card_main">
        <ul class="card_list">
          <li class="list_item">
            <p class="item_title">考勤班级</p>
            <div class="item_class_content">
              <div class="punch_name">软件一班</div>
              <zs-button
                type="light"
                :style="{ fontSize: '12px' }"
                :width="69"
                :height="24"
              >
                选择班级
              </zs-button>
            </div>
          </li>
          <li class="list_item item_time">
            <div class="item_time_left">
              <div class="timer">
                <span class="timer_name">开始时间</span>
                <span class="time">13:13</span>
              </div>
              <div class="spilt">-</div>
              <div class="timer">
                <span class="timer_name">开始时间</span>
                <span class="time">13:13</span>
              </div>
            </div>
            <div class="item_time_right">共<span>0</span>分钟</div>
          </li>
          <li class="list_item item_time">
            <div class="item_address_left">
              <div class="address_name">考勤地点</div>
              <div class="address_content">西北民族大学数计院</div>
            </div>
            <div class="item_address_right">
              <img src="@/images/local.png" alt="" />
              <span>当前位置</span>
            </div>
          </li>
        </ul>
        <zs-button
          :width="230"
          :height="30"
          :style="{ margin: '18px auto 0 auto', width: '60%' }"
        >
          开始考勤
        </zs-button>
      </div>
      <!-- 无班级提示 -->
      <div v-else class="default_hint">
        <img src="@/images/clock-gray.png" alt="" />
        您目前暂无班级，先去创建班级吧~
      </div>
    </div>
    <!-- 我的班级 -->
    <div class="card class_card">
      <h2 class="card_title">我的班级</h2>
      <div v-if="classVos && classVos.length" class="card_main">
        <ul class="card_list">
          <li
            v-for="(cls, idx) in classVos"
            :key="cls.id"
            :hidden="idx >= 3 && !showAllClasses"
            class="list_item class_item"
          >
            <div class="class_avatar">{{ cls.className }}</div>
            <div class="class_info">
              <div class="info_detail">
                <div class="name">{{ cls.className }}</div>
                <div class="msg">共{{ (cls.studentList || []).length }}人</div>
              </div>
              <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="" />
              </div>
            </div>
          </li>
        </ul>
        <div v-if="!showAllClasses" class="link">
          管理全部班级<img src="@/images/arrow_right_gray.png" alt="" />
        </div>
      </div>
      <div v-else class="default_hint">
        <img src="@/images/clock-gray.png" alt="" />
        {{
          userInfo.role === "TEACHER"
            ? "您目前暂无班级，先去创建班级吧~"
            : "您尚未加入班级，先去加入班级吧~"
        }}
      </div>
    </div>
    <!-- 消息通知 -->
    <div class="card">
      <h2 class="card_title">消息通知</h2>
      <ul v-if="noticeList && noticeList.length" class="card_list">
        <li
          v-for="notice in noticeList"
          :key="notice.id"
          @click="showApproveModal(notice.userVo, notice.classVo, notice.isPass != 'LOADING')"
          class="list_item item_result flx flx-sbX"
        >
          <div class="result flx-col flx-sbX">
            <div
              class="result_name one-line-text"
              :class="notice.read ? 'readed' : ''"
            >
              {{ notice.userVo.realName }}同学申请加入{{
                notice.classVo.className
              }}，请及时审批。
            </div>
            <div class="result_info flx flx-sbX">
              <div class="result_time">
                {{ new Date(notice.createdAt).Format("yyyy/MM/dd hh:mm") }}
              </div>
            </div>
          </div>
          <div v-if="notice.isPass === 'LOADING'" class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
          <div v-if="notice.isPass === 'LOADING'" class="unread" />
          <transition name="fade">
            <div
              v-if="notice.isPass != 'LOADING'"
              class="logo"
              :class="notice.isPass === 'PASS' ? '' : 'reject'"
            >
              {{ notice.isPass === "PASS" ? "同意" : "拒绝" }}
            </div>
          </transition>
        </li>
      </ul>
      <div v-else class="default_hint">
        <img
          src="@/images/no-message.png"
          style="width: 26px; height: 29px"
          alt=""
        />
        暂无消息
      </div>
    </div>
    <!-- 考勤结果 -->
    <div class="card">
      <h2 class="card_title">考勤结果</h2>
      <ul v-if="punchResultList && punchResultList.length" class="card_list">
        <li
          v-for="result in punchResultList"
          :key="result.id"
          @click="viewPunchDetail(result.id)"
          class="list_item item_result flx flx-sbX"
        >
          <div class="result flx-col flx-sbX">
            <div
              class="result_name one-line-text"
              :class="result.read ? 'readed' : ''"
            >
              {{ result.className }}考勤结果已统计，点击查收。
            </div>
            <div class="result_info flx flx-sbX">
              <div class="base_info">0人请假 3人未打卡</div>
              <div class="result_time">
                {{ new Date(result.endTime).Format("yyyy/MM/dd hh:mm") }}
              </div>
            </div>
          </div>
          <div class="arrow">
            <img src="@/images/arrow_right_black.png" alt="" />
          </div>
          <div v-if="!result.read" class="unread" />
        </li>
      </ul>
      <div v-else class="default_hint">
        <img
          src="@/images/no-message.png"
          style="width: 26px; height: 29px"
          alt=""
        />
        暂无考勤结果
      </div>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
// import components
import { getStringLocalTime } from "@/lib/jsUtils";
import ZsButton from "@/components/zs_button/ZsButton";
import HomeFooter from "@/components/home_footer/HomeFooter";
import HomeAPI from "../../api/homeAPI";
import ClassAPI from "../../api/classAPI";

export default {
  data() {
    return {
      localTime: getStringLocalTime(),
      classVos: [],
      punchResultList: [],
      showAllClasses: false,
      userInfo: {},
      noticeList: []
    };
  },
  components: { ZsButton, HomeFooter },
  methods: {
    formatTime(time, fmt) {
      return new Date(time).Format(fmt);
    },
    viewPunchDetail(id) {
      this.$router.push("/punchDetail?id=" + id);
    },
    showApproveModal(userVo, classVo, ban) {
      if(ban) {
        return;
      }
      this.$alert({
        title: "审批加入班级",
        message: `${userVo.realName}同学（学号：${userVo.sno}）申请加入${classVo.className}，是否同意？`,
        showCancelButton: true,
        cancelButtonText: "拒绝",
        confirmButtonText: "同意"
      }).then((action) => {
        const isPass = action === "confirm";
        ClassAPI.handleApply(userVo.id, classVo.id, isPass).then(({ data }) => {
          if (data === "NO_AUTHORITY") {
            this.$toast("没有操作权限");
          } else if (data) {
            this.noticeList.find(
              (v) => v.userVo === userVo && v.classVo === classVo
            ).isPass = isPass ? "PASS" : "REJECT";
            this.$toast(isPass ? "已通过" : "已拒绝申请");
          } else {
            this.$toast("服务器错误，请重试");
          }
        });
      });
    }
  },
  computed: {},
  mounted() {
    HomeAPI.getPageData()
      .then(({ data }) => {
        this.showAllClasses = data.classList.length <= 3;
        this.classVos = data.classList;
        this.punchResultList = data.endPunchList;
        this.userInfo = data.userInfo;
        this.noticeList = data.noticeList;
      })
      .catch(() => {
        this.$toast("服务器错误，请重试");
      });
  }
};
</script>

<style src="./Home.css" scoped></style>
