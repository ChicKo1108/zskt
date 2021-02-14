<template>
  <div class="footer flx flx-sbX flx-centerY">
    <div
      v-for="(btn, idx) in btnList"
      :key="btn.id"
      class="icon_box flx-col flx-sbX flx-centerY"
      @click="view(btn.path)"
    >
      <div class="icon_img">
        <img
          :style="{
            width: idx === 2 ? '33px' : '23px',
            height: idx === 2 ? '33px' : '23px',
          }"
          :src="btn.selected ? btn.selectedIcon : btn.icon"
          alt=""
        />
      </div>
      <div v-if="idx !== 2" :class="btn.selected? 'selected' : ''" class="icon_name">{{ btn.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      btnList: [
        {
          id: 1,
          name: "首页",
          icon: require("@/assets/images/home.png"),
          selectedIcon: require("@/assets/images/home_selected.png"),
          path: '/',
          selected: this.index === 0
        },
        {
          id: 2,
          name: "消息",
          icon: require("@/assets/images/message.png"),
          selectedIcon: require("@/assets/images/message_selected.png"),
          path: '/messageHome',
          selected: this.index === 1
        },
        {
          id: 3,
          name: "",
          icon: require("@/assets/images/punch.png"),
          path: '/punchHome'
        },
        {
          id: 4,
          name: "通讯录",
          icon: require("@/assets/images/note.png"),
          selectedIcon: require("@/assets/images/note_selected.png"),
          path: '/addressHome',
          selected: this.index === 3
        },
        {
          id: 5,
          name: "我的",
          icon: require("@/assets/images/my.png"),
          selectedIcon: require("@/assets/images/my_selected.png"),
          path: '/myHome',
          selected: this.index === 4
        }
      ]
    };
  },
  methods: {
    view(path) {
      if(this.$route.path === path) {
        return;
      }
      this.$router.replace(path);
    }
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 49px;
  background-color: #fff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.16);
  padding: 4px 28px 0px 28px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
}

.icon_box {
  font-size: 12px;
  color: #333;
  line-height: 16px;
}

.icon_img > img {
  width: 23px;
  height: 23px;
}

.selected {
  color: #1C7EFF;
}
</style>