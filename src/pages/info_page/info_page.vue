<template>
  <div class="info_page">
    <div class="nav_bar">
      <div @click="$router.back()" class="nav_bar_icon">
        <img src="@/images/arrow-left-white.png" alt="" />
      </div>
      <div v-if="mode === 'class'" class="nav_bar_icon">
        <img src="@/images/edit_icon.png" alt="" />
      </div>
      <div @click="toggleTip" class="nav_bar_icon">
        <img src="@/images/info_icon.png" alt="" />
        <transition name="fade">
          <div v-show="isShowTip" class="tip">
            只有本班级成员可以查看相关统计
          </div>
        </transition>
      </div>
    </div>
    <div class="header">
      <div class="bottom_border"></div>
      <div class="info">
        <div class="avatar">
          <img src="@/images/default_avatar.png" alt="" />
        </div>
        <div class="infos">
          <div class="info_name">2017级软件工程1班 (22)</div>
          <div class="info_id">
            {{ mode === "stu" ? "用户" : "班级" }}id: 198342
          </div>
        </div>
      </div>
    </div>
    <!-- 数据统计图 -->
    <div class="statistic_block">
      <div class="block">
        <div class="block_header">
          <span>2020年09月01日 - 2021年01月10日</span>
          <zs-button style="width:70px;height:22px;font-size:12px">
            切换日期
          </zs-button>
        </div>
        <div class="block_chart" id="class_stat"></div>
        <div v-if="mode === 'stu'" class="block_footer">2020年09月01日 - 2021年01月10日</div>
      </div>
    </div>
    <div class="options_bar">
      <zs-button class="options_btn">发起聊天</zs-button>
      <zs-button v-if="mode === 'class'" type="danger" class="options_btn">解散班级</zs-button>
    </div>
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
export default {
  components: { zsButton: ZsButtonVue },
  data() {
    return {
      isShowTip: false,
      mode: '',
      id: ''
    };
  },
  mounted() {
    this.initCharts();
    const { id, mode } = this.$route.query;
    this.id = id;
    this.mode = mode;
  },
  methods: {
    initCharts() {
      const number = 15;
      const chartDom = document.getElementById("class_stat");
      const myChart = this.$echarts.init(chartDom);
      chartDom.style.height = number * 25 + "px";
      myChart.resize();

      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["按时考勤", "请假", "缺勤"]
        },
        grid: {
          left: "18",
          right: "18",
          bottom: "20",
          containLabel: true
        },
        barCategoryGap: "40%",
        xAxis: {
          type: "value",
          position: "top"
        },
        yAxis: {
          type: "category",
          data: ["王一", "王二", "王三", "王四", "王五"]
        },
        series: [
          {
            type: "bar",
            data: [60, 65, 60, 70, 69],
            name: "按时考勤",
            stack: "总量",
            color: "#5470C6",
            label: {
              show: true,
              position: "insideRight"
            }
          },
          {
            type: "bar",
            data: [5, 5, 3, 0, 1],
            name: "缺勤",
            stack: "总量",
            color: "#91CC75",
            label: {
              show: true,
              position: "insideRight"
            }
          },
          {
            type: "bar",
            data: [5, 0, 7, 0, 0],
            name: "请假",
            stack: "总量",
            color: "#FAC858",
            label: {
              show: false,
              position: "insideRight"
            }
          }
        ]
      };
      // 渲染charts
      option && myChart.setOption(option);
    },
    toggleTip() {
      this.isShowTip = !this.isShowTip;
    }
  }
};
</script>

<style src="./info_page.css" scoped></style>
