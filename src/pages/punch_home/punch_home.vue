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
              <span @click="openPicker('startTimePicker')">
                {{ startTime }}
              </span>
              <span>-</span>
              <span @click="openPicker('endTimePicker')">{{ endTime }}</span>
            </div>
          </div>
          <div class="line_right" style="margin-right: 9px">
            共<span class="total_time">{{ intervalTime }}</span
            >分钟
          </div>
        </div>
        <div class="card_line">
          <div class="line_left">
            <div class="line_title">考勤地点</div>
            <div class="line_content">西北民族大学数计院</div>
          </div>
          <div class="line_right local">
            <img src="@/images/local.png" alt="" />
            <span>当前位置</span>
          </div>
        </div>
      </div>
      <zs-button
       :height="40" 
       style="margin: 14px auto 0 auto;width:70%;"
       :onClick="createPunch"
      >
        开始考勤
      </zs-button>
    </div>
    <!-- Footer -->
    <div class="footer">
      <div class="icon selected">
        <img src="@/images/clock_selected.png" alt="" />
        <span>考勤</span>
      </div>
      <div @click="$router.replace('/punchStatistic')" class="icon">
        <img src="@/images/statistic.png" alt="" />
        <span>统计</span>
      </div>
    </div>
    <!-- mt-datetime-picker -->
    <mt-datetime-picker
      ref="startTimePicker"
      type="time"
      @confirm="setStartTime"
      v-model="startTime"
    />
    <mt-datetime-picker
      ref="endTimePicker"
      type="time"
      @confirm="setEndTime"
      v-model="endTime"
    />
  </div>
</template>

<script>
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
import { Toast } from "mint-ui";
import jsUtils from '../../lib/jsUtils.js';
import classAPI from "../../api/classAPI.js";
import punchAPI from "../../api/punchAPI.js";
export default {
  components: { zsNavBar: ZsNavBarVue, zsButton: ZsButtonVue },
  data() {
    return {
      sheetVisible: false,
      startTime: "13:30",
      endTime: "13:30",
      classList: [],
      lng: "",
      lat: "",
      address: "暂时固定地名"
    };
  },
  mounted() {
    this.loadMap(this);
    this.setDefaultTime();
    classAPI.getMyClassList().then(({ data }) => {
      if (data && data.length) {
        data[0].selected = true;
      }
      this.classList = data;
    });
  },
  methods: {
    loadMap(that) {
      AMapLoader.load({
        key: "b82a4b0b0256eb54e5cbf62fda794bc8",
        zoom: 20,
        plugins: ["AMap.Geolocation"]
      })
        .then((AMap) => {
          const map = new AMap.Map("map");
          map.setZoom(14);
          // 定位插件
          const geolocation = new AMap.Geolocation({
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(0, 0),
            zoomToAccuracy: true,
            buttonPosition: "RT",
            panToLocation: true
          });
          geolocation.getCurrentPosition(function(status, result) {
            if (status == "complete") {
              onComplete(result);
            } else {
              onError(result);
            }
          });

          function onComplete(data) {
            // data是具体的定位信息
            const { lng, lat } = data.position;
            const position = new AMap.LngLat(lng, lat);
            map.setCenter(position);
            // 添加考勤点
            const marker = new AMap.Marker({
              position,
              title: "考勤中心"
            });
            map.add(marker);
            // 保存 lng, lat 数据
            that.lng = lng;
            that.lat = lat;
          }

          function onError(data) {
            // 定位出错
            console.error(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setStartTime() {
      this.checkTime();
    },
    setEndTime() {
      const result = this.checkTime();
      if (result) {
        Toast("结束时间应该晚于开始时间");
      }
    },
    checkTime() {
      const startHours = this.startTime ? this.startTime.split(":")[0] : 0;
      const startMin = this.startTime ? this.startTime.split(":")[1] : 0;
      const endHours = this.endTime ? this.endTime.split(":")[0] : 0;
      const endMin = this.endTime ? this.endTime.split(":")[1] : 0;
      if (
        startHours > endHours ||
        (startHours === endHours && startMin > endMin)
      ) {
        this.endTime = this.startTime;
        return true;
      }
      return false;
    },
    openPicker(pickerName) {
      this.$refs[pickerName].open();
    },
    setDefaultTime() {
      const nowTime = new Date().getHours() + ":" + new Date().getMinutes();
      this.startTime = nowTime;
      this.endTime = nowTime;
    },
    createPunch() {
      console.log(1);
      const { classList, lng, lat, address, startTime, endTime } = this.$data;
      if(endTime <= startTime) {
        Toast("结束时间应该晚于开始时间");
        return;
      }
      punchAPI
        .createPunch({
          classId: classList.find((v) => v.selected).id,
          lng,
          lat,
          address,
          startTime: jsUtils.getTimestamp(startTime),
          endTime: jsUtils.getTimestamp(endTime)
        })
        .then((res) => {
          console.log(res);
        });
    }
  },
  computed: {
    intervalTime() {
      const startHours = this.startTime ? this.startTime.split(":")[0] : 0;
      const startMin = this.startTime ? this.startTime.split(":")[1] : 0;
      const endHours = this.endTime ? this.endTime.split(":")[0] : 0;
      const endMin = this.endTime ? this.endTime.split(":")[1] : 0;
      return endHours * 60 + endMin - (startHours * 60 + startMin);
    }
  }
};
</script>

<style src="./punch_home.css" scoped></style>
