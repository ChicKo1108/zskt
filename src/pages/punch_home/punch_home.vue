<template>
  <div class="punch_home">
    <zs-nav-bar title="考勤"></zs-nav-bar>
    <!-- 地图 -->
    <div id="map"></div>
    <!-- 考勤详情 -->
    <div class="punch_card_wrap">
      <div class="card_header">考勤详情</div>
      <div>
        <div class="card_line">
          <div class="line_left">
            <div class="line_title">考勤班级</div>
            <div class="line_content">2017级软件工程1班</div>
          </div>
          <div class="line_right">
            <zs-button
              style="font-size: 12px"
              :width="69"
              :height="24"
              type="light"
              >选择班级</zs-button
            >
          </div>
        </div>
        <div class="card_line">
          <div class="line_left">
            <div class="line_title time_title">
              <span>开始时间</span>
              <span>结束时间</span>
            </div>
            <div class="line_content time_content">
              <span>13:01</span>
              <span>-</span>
              <span>13:01</span>
            </div>
          </div>
          <div class="line_right" style="margin-right: 9px">
            共<span class="total_time">0</span>分钟
          </div>
        </div>
        <div class="card_line">
          <div class="line_left">
            <div class="line_title">考勤地点</div>
            <div class="line_content">西北民族大学数计院</div>
          </div>
          <div class="line_right local">
            <img src="@/assets/images/local.png" alt="" />
            <span>当前位置</span>
          </div>
        </div>
      </div>
      <zs-button :height="40" style="margin: 14px auto 0 auto;width:70%;">开始考勤</zs-button>
    </div>
    <!-- Footer -->
    <div class="footer">
        <div class="icon selected">
            <img src="@/assets/images/clock_selected.png" alt="">
            <span>考勤</span>
        </div>
        <div class="icon">
            <img src="@/assets/images/statistic.png" alt="">
            <span>统计</span>
        </div>
    </div>
  </div>
</template>

<script>
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
export default {
  components: { zsNavBar: ZsNavBarVue, zsButton: ZsButtonVue },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      AMapLoader.load({
        key: "b82a4b0b0256eb54e5cbf62fda794bc8",
        plugins: []
      })
        .then((Amap) => {
          new Amap.Map("map");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};
</script>

<style src="./punch_home.css" scoped></style>