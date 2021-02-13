<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    console.log(this.$route);
  }
};
</script>

<style>
</style>
