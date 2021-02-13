<template>
  <button :style="style" @click="onClick()" class="zs-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String,
      default: "primary"
    },
    width: {
      type: Number,
      default: 316
    },
    height: {
      type: Number,
      default: 40
    }
  },
  computed: {
    style() {
      const style = {
        width: `${this.width}px`,
        height: `${this.height}px`,
        borderRadius: `${this.height / 2}px`
      };
      if(this.type === 'primary') {
        style.background = 'linear-gradient(135deg, #1C7EFF 0%, #539CFC 100%)';
      } else if (this.type === 'danger') {
        style.background = 'linear-gradient(135deg, #FF1C1C 0%, #FC5353 100%)';
      } else if (this.type === 'light') {
        style.border = '#1C7EFF 1px solid';
        style.color = '#1C7EFF';
        style.background = '#fff';
      }
      return style;
    }
  }
};
</script>

<style scoped>
.zs-button {
  width: 316px;
  height: 40px;
  color: #fff;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.zs-button:hover {
    outline: none;
}
</style>