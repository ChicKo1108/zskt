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
            <div class="line_content">
              {{
                classList.find((v) => v.selected)
                  ? classList.find((v) => v.selected).className
                  : ""
              }}
            </div>
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
            共
            <span class="total_time">{{ intervalTime }}</span>
            分钟
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
        v-if="showPunchBtn"
        :height="40"
        style="margin: 14px auto 0 auto;width:70%;"
        :onClick="createPunch"
      >
        开始考勤
      </zs-button>
      <zs-button
        v-else
        :height="40"
        style="margin: 14px auto 0 auto;width:70%;"
        type="danger"
        :onClick="stopPunch"
      >
        考勤中 剩余{{ countDownTime }}
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
import jsUtils from "../../lib/jsUtils.js";
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
      address: "暂时固定地名",
      timerId: "",
      countDownTime: "",
      punchId: "",
      showPunchBtn: true
    };
  },
  mounted() {
    this.loadMap(this);
    this.setDefaultTime();
    Promise.all([classAPI.getMyClassList(), punchAPI.getPunchingList()]).then(
      (res) => {
        const classList = res[0].data;
        const punchingList = res[1].data;
        if (punchingList.length) {
          punchingList.forEach((punching) => {
            classList.forEach((cls) => {
              if (cls.id === punching.ClassId) {
                cls.isPunching = true;
                cls.punchingInfo = punching;
              }
            });
            this.classList = [
              ...classList.filter((v) => v.isPunching),
              ...classList.filter((v) => !v.isPunching)
            ];
            this.classList[0].selected = true;
            this.startTime = this.formatTimeHm(classList[0].punchingInfo.startTime);
            this.endTime = this.formatTimeHm(classList[0].punchingInfo.endTime);
            this.lng = classList[0].punchingInfo.lng;
            this.lat = classList[0].punchingInfo.lat;
            this.address = classList[0].punchingInfo.address;
            this.punchId = classList[0].punchingInfo.id;
            this.showPunchBtn = false;
            this.beginInterval();
          });
        } else {
          classList[0].selected = true;
          this.classList = classList;
        }
      }
    );
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
            this.$toast('地图组件初始化错误' + data);
            console.error(data);
          }
        })
        .catch((err) => {
          this.$toast('地图组件初始化错误' + err);
          console.error(err);
        });
    },
    beginInterval() {
      this.timerId = setInterval(() => {
        const now = new Date();
        const endTime = jsUtils.getTimestamp(this.endTime);
        if (now >= endTime) {
          clearInterval(this.timerId);
          this.classList.find(v => v.selected).isPunching = false;
          this.$alert({
            title: "考勤结束",
            message: "您可在考勤统计中查看结果",
            showCancelButton: true,
            confirmButtonText: "立即查看",
            cancelButtonText: "我知道了"
          }).then((action) => {
            if (action === "confirm") {
              console.log(1);
            } else {
              console.log(2);
            }
          });
        }
        this.countDownTime =
                new Date(endTime - now).getMinutes() +
                "分" +
                new Date(endTime - now).getSeconds() +
                "秒";
      }, 1000);
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
    formatTimeHm(time) {
      return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
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
      const { classList, lng, lat, address, startTime, endTime } = this.$data;
      if (jsUtils.getTimestamp(endTime) <= jsUtils.getTimestamp(startTime)) {
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
        .then(({ data }) => {
          if (data.msg === "OK") {
            this.showPunchBtn = false;
            this.punchId = data.data.id;
            this.beginInterval();
            this.classList.find(v => v.selected).isPunching = true;
          } else if (data.msg === "END_TIME_SHOULD_AFTER_NOW") {
            this.$toast('结束时间不能小于当前时间！');
          }
        });
    },
    stopPunch() {
      this.$alert({
        title: "提前结束考勤",
        message: "确定要提前结束本次考勤吗？",
        showCancelButton: true,
        cancelButtonText: "我点错了",
        confirmButtonText: "提前结束"
      }).then((action) => {
        if (action === "confirm") {
          punchAPI.stopPunch(this.punchId).then((data) => {
            this.showPunchBtn = true;
            if (data) {
              clearInterval(this.timerId);
              this.isPunching = false;
              this.$toast("考勤已结束，您可在考勤统计中查看本次结果");
            } else {
              this.$toast("服务器错误！");
            }
          });
        }
      });
    }
  },
  computed: {
    intervalTime() {
      return new Date(
        jsUtils.getTimestamp(this.endTime) -
          jsUtils.getTimestamp(this.startTime)
      ).getMinutes();
    }
  }
};
</script>

<style src="./punch_home.css" scoped></style>
