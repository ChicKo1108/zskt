<template>
  <div class="header">
    <h1>{{ localTime }}好，欢迎来到准时课堂！</h1>
    <p>——即刻体验更加高效、快捷的考勤方式</p>
  </div>
</template>

<script>
import { getStringLocalTime } from "@/utils/jsUtils";
export default {
  data() {
    return {
      localTime: getStringLocalTime()
    };
  },
  methods: {},
  computed: {},
  mounted() {
    console.log(this.$data);
  }
};
</script>

<style scoped>
.header {
  height: 200px;
  background: linear-gradient(135deg, #1c7eff 0%, #539cfc 100%);
  box-sizing: border-box;
  padding: 23px;
  color: #fff;
}
.header h1 {
  font-size: 22px;
  line-height: 29px;
  font-weight: bold;
  font-family: "microsoft YaHei";
}
.header p {
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  margin-left: 99px;
  margin-top: 8px;
}
</style>