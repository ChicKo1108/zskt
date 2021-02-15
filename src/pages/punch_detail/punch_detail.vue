<template>
  <div class="punch_detail">
    <zs-nav-bar title="考勤详情"></zs-nav-bar>
    <div class="base_info_wrap">
      <div class="base_info_header">
        <div class="avatar">
          <img src="@/images/default_avatar.png" alt="" />
        </div>
        <div class="infos">
          <div class="name">2017级软件工程1班</div>
          <div class="other">共36人 2021/01/31 11:30 - 11:40</div>
        </div>
        <div class="ellips">
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
  </div>
</template>

<script>
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
export default {
  components: { zsNavBar: ZsNavBarVue }
};
</script>

<style src="./punch_detail.css" scoped></style>