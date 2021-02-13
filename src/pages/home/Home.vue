<template>
  <div class="home">
    <div class="header">
      <h1>{{ localTime }}好，欢迎来到准时课堂！</h1>
      <p>——即刻体验更加高效、快捷的考勤方式</p>
    </div>
    <!-- 快捷考勤 -->
    <div class="card punch_card">
      <h2 class="card_title">快捷考勤</h2>
      <ul class="card_list">
        <li class="list_item">
          <p class="item_title">考勤班级</p>
          <div class="item_class_content">
            <div class="punch_name">2017级软件工程1班</div>
            <zs-button
              type="light"
              :style="{ fontSize: '12px' }"
              :onClick="test"
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
            <img src="@/assets/images/local.png" alt="" />
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
    <!-- 我的班级 -->
    <div class="card class_card">
      <h2 class="card_title">我的班级</h2>
      <ul class="card_list">
        <li class="list_item class_item">
          <div class="class_avatar">
            <img src="@/assets/images/default_avatar.png" alt="" />
          </div>
          <div class="class_info">
            <div class="info_detail">
              <div class="name">2017级软件工程1班</div>
              <div class="msg">共23人 班长：王小明</div>
            </div>
            <div class="arrow">
              <img src="@/assets/images/arrow_right_black.png" alt="" />
            </div>
          </div>
        </li>
        <li class="list_item class_item">
          <div class="class_avatar">
            <img src="@/assets/images/default_avatar.png" alt="" />
          </div>
          <div class="class_info">
            <div class="info_detail">
              <div class="name">2017级软件工程1班</div>
              <div class="msg">共23人 班长：王小明</div>
            </div>
            <div class="arrow">
              <img src="@/assets/images/arrow_right_black.png" alt="" />
            </div>
          </div>
        </li>
        <li class="list_item class_item">
          <div class="class_avatar">
            <img src="@/assets/images/default_avatar.png" alt="" />
          </div>
          <div class="class_info">
            <div class="info_detail">
              <div class="name">2017级软件工程1班</div>
              <div class="msg">共23人 班长：王小明</div>
            </div>
            <div class="arrow">
              <img src="@/assets/images/arrow_right_black.png" alt="" />
            </div>
          </div>
        </li>
      </ul>
      <div class="link">
        管理全部班级<img src="@/assets/images/arrow_right_gray.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getStringLocalTime } from "@/utils/jsUtils";
import ZsButton from "@/components/zs_button/ZsButton";

export default {
  data() {
    return {
      localTime: getStringLocalTime()
    };
  },
  components: { ZsButton },
  methods: {
    test() {
      console.log(1);
    }
  },
  computed: {},
  mounted() {
    console.log(this.$data);
  }
};
</script>

<style scoped>
@import url("./Home.css");
</style>