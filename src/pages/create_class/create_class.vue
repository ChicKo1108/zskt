<template>
  <div class="create_class">
    <zs-nav-bar title="创建班级"></zs-nav-bar>
    <div class="block_container">
      <div class="block_title">班级信息</div>
      <div class="block">
        <div class="line">
          <div class="base_info_name">班级名称</div>
          <div class="base_info_ipt"><input type="text" /></div>
        </div>
        <div class="line">
          <div class="base_info_name">所属学校</div>
          <div class="base_info_ipt"><input type="text" /></div>
        </div>
        <div class="line">
          <div class="base_info_name">学院</div>
          <div class="base_info_ipt"><input type="text" /></div>
        </div>
      </div>
    </div>
    <div class="block_container">
      <div class="block_title">通用功能</div>
      <div class="block">
        <div class="line">
          <div class="base_info_name" style="width: auto">
            导入其他班级学生
          </div>
          <div class="base_info_ipt"><input type="text" /></div>
        </div>
        <div class="line">
          <div class="base_info_name" style="width: auto">
            是否可以通过搜索框搜索到该班级
          </div>
          <div
            @click="toggleSearch"
            :style="{
              backgroundColor: canSearch ? '#1c7eff' : '#ddd',
              borderColor: canSearch ? '#1c7eff' : '#ddd',
            }"
            class="switch"
          >
            <span
              :style="{
                transform: canSearch
                  ? 'translate(100%, -50%)'
                  : 'translate(3px, -50%)',
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <zs-button class="create_class_btn">创建班级</zs-button>
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
export default {
  components: { zsNavBar: ZsNavBarVue, zsButton: ZsButtonVue },
  data() {
    return {
      canSearch: true
    };
  },
  methods: {
    toggleSearch() {
      this.canSearch = !this.canSearch;
    }
  }
};
</script>

<style src="./create_class.css" scoped></style>
