<template>
  <div class="punch_statistic">
    <zs-nav-bar title="考勤"></zs-nav-bar>
    <!-- 主体内容 -->
    <div v-for="dateVo in punchList" :key="dateVo.date" class="day_chunk">
      <div class="chunk_title">{{dateVo.date}}</div>
      <ul class="punch_list">
        <li v-for="punchVo in dateVo.punches" :key="punchVo.id" @click="viewDetail(punchVo.id)" class="punch_item_wrap">
          <div class="punch_info_container">
            <div class="punch_info">
              <div class="line">
                <span class="title">考勤时间：</span>
                <span class="content">{{new Date(punchVo.startTime).Format('hh:mm')}}-{{new Date(punchVo.endTime).Format('hh:mm')}}</span>
              </div>
              <div class="line">
                <span class="title">考勤班级：</span>
                <span class="content">{{(punchVo.classVo || {}).className}}</span>
              </div>
              <div class="line">
                <span class="title">考勤地点：</span>
                <span class="content">{{punchVo.address}}</span>
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
              <div class="circle">{{punchVo.classVo.studentList.length}}</div>
            </div>
            <div class="count_item green">
              <span>已打卡人数</span>
              <div class="circle">{{punchVo.punchedNum}}</div>
            </div>
            <div class="count_item yellow">
              <span>请假人数</span>
              <div class="circle">{{punchVo.leaveNum}}</div>
            </div>
            <div class="count_item red">
              <span>未打卡人数</span>
              <div class="circle">{{punchVo.unPunchedNum}}</div>
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
import PunchAPI from "../../api/punchAPI.js";
export default {
  components: { zsNavBar: ZsNavBarVue },
  data() {
    return {
      punchList: []  
    };
  },
  mounted() {
    this.toastInstance = this.$toast({
      message: "加载中...",
      duration: -1
    });
    PunchAPI.getPunchList().then(({data}) => {
      const punchList = data;
      const dateArr = [];
      punchList.forEach(v => {
        if(dateArr.length === 0) {
          dateArr.push({date: new Date(v.startTime).Format("yyyy年MM月dd日"), punches: [v]});
        } else {
          if(dateArr.findIndex(dateVo => dateVo.date === new Date(v.startTime).Format("yyyy年MM月dd日")) > -1) {
            dateArr[dateArr.findIndex(dateVo => dateVo.date ===new Date(v.startTime).Format("yyyy年MM月dd日"))].punches.push(v);
          } else {
            dateArr.push({date: new Date(v.startTime).Format("yyyy年MM月dd日"), punches: [v]});
          }
        }
      });
      this.punchList = dateArr;
      this.toastInstance.close();
    });
  },
  methods: {
    viewDetail(id) {
      this.$router.push("/punchDetail?id=" + id);
    }
  }
};
</script>

<style src="./punch_statistic.css" scoped></style>