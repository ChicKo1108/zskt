<template>
  <div class="punch_statistic">
    <zs-nav-bar title="考勤"></zs-nav-bar>
    <!-- 主体内容 -->
    <div class="day_chunk">
      <div class="chunk_title">2021年1月30日 星期六</div>
      <ul class="punch_list">
        <li @click="viewDetail()" class="punch_item_wrap">
          <div class="punch_info_container">
            <div class="punch_info">
              <div class="line">
                <span class="title">考勤时间：</span>
                <span class="content">11:00-11:10</span>
              </div>
              <div class="line">
                <span class="title">考勤班级：</span>
                <span class="content">2017级软件工程1班</span>
              </div>
              <div class="line">
                <span class="title">考勤地点：</span>
                <span class="content">西北民族大学数计院</span>
              </div>
            </div>
            <div class="punch_info_btn">
              查看详情
              <img src="@/images/arrow_right_black.png" alt="" />
            </div>
          </div>
          <div class="punch_count_container">
            <div class="count_item blue">
              <span>总人数</span>
              <div class="circle">35</div>
            </div>
            <div class="count_item green">
              <span>已打卡人数</span>
              <div class="circle">35</div>
            </div>
            <div class="count_item yellow">
              <span>请假人数</span>
              <div class="circle">35</div>
            </div>
            <div class="count_item red">
              <span>总人数</span>
              <div class="circle">35</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- Footer -->
    <div class="footer">
      <div @click="$router.replace('/punchHome')" class="icon">
        <img src="@/images/clock.png" alt="" />
        <span>考勤</span>
      </div>
      <div class="icon selected">
        <img src="@/images/statistic_selected.png" alt="" />
        <span>统计</span>
      </div>
    </div>
  </div>
</template>

<script>
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
export default {
  components: { zsNavBar: ZsNavBarVue },
  methods: {
    viewDetail(id) {
      this.$router.push("/punchDetail?id=" + id);
    }
  }
};
</script>

<style src="./punch_statistic.css" scoped></style>