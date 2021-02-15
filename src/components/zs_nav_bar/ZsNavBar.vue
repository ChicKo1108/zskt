<template>
  <div :class="typeToClass" class="zs-nav-bar">
    <div @click="goBack" v-if="type !== 'simple'" class="nav_bar_left">
      <img src="@/images/arrow-left-white.png" alt="" />
    </div>
    <div class="nav_bar_title">{{ title }}</div>
    <div v-if="type !== 'simple'" class="nav_bar_right"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    type: {
      type: String,
      default: "default"
    }
  },
  computed: {
    typeToClass() {
      switch (this.type) {
      case "default":
        return "zs-nav-bar-default";
      case "simple":
        return "zs-nav-bar-simple";
      default:
        return "";
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.zs-nav-bar {
  height: 45px;
  background: linear-gradient(135deg, #1c7eff 0%, #539cfc 100%);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 20px;
  box-sizing: border-box;
  padding: 0 20px;
  z-index: 999;
}

.zs-nav-bar-default {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zs-nav-bar-simple {
  line-height: 45px;
}

.nav_bar_left > img {
  width: 13px;
  height: 22px;
  position: relative;
  top: 3px;
}
</style>