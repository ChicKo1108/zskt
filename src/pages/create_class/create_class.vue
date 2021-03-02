<template>
  <div class="create_class">
    <zs-nav-bar title="创建班级"></zs-nav-bar>
    <div class="block_container">
      <div class="block_title">班级信息</div>
      <div class="block">
        <div class="line">
          <div class="base_info_name">班级名称</div>
          <div class="base_info_ipt">
            <input v-model="className" type="text" />
          </div>
        </div>
        <div class="line">
          <div class="base_info_name">所属学校</div>
          <div class="base_info_ipt">
            <input v-model="school" type="text" />
          </div>
        </div>
        <div class="line">
          <div class="base_info_name">学院</div>
          <div class="base_info_ipt">
            <input v-model="college" type="text" />
          </div>
        </div>
      </div>
    </div>
    <div class="block_container">
      <div class="block_title">通用功能</div>
      <div class="block">
        <div class="line">
          <div class="base_info_name" style="width: auto">导入其他班级学生</div>
          <div class="base_info_ipt">
            <input
              @blur="findClassById"
              v-model="importClassId"
              type="text"
              placeholder="请输入班级Id"
            />
          </div>
          <div :style="{color: tipsColor}" class="tip">{{ tips }}</div>
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
    <zs-button :onClick="createClass" class="create_class_btn"
      >创建班级</zs-button
    >
  </div>
</template>

<script>
import ZsButtonVue from "../../components/zs_button/ZsButton.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import userAPI from "../../api/classAPI";
export default {
  components: { zsNavBar: ZsNavBarVue, zsButton: ZsButtonVue },
  data() {
    return {
      canSearch: true,
      className: "",
      school: "",
      college: "",
      importClassId: "",
      tips: "",
      tipsColor: "red"
    };
  },
  methods: {
    toggleSearch() {
      this.canSearch = !this.canSearch;
    },
    createClass() {
      if (!this.className) {
        this.$toast("请输入班级名称！");
        return;
      }
      userAPI
        .create({
          className: this.className,
          school: this.school,
          college: this.college,
          canSearch: this.canSearch
        })
        .then(({ data }) => {
          if (data.msg === "OK") {
            this.$toast("创建成功");
            this.$router.go(-1);
          } else {
            this.$toast("服务器错误，请重试");
          }
        })
        .catch(() => {
          this.$toast("服务器错误，请重试");
        });
    },
    findClassById() {
      if (!this.importClassId) {
        this.tips = "";
        return false;
      }
      userAPI
        .findById(this.importClassId)
        .then(({ data }) => {
          if (data.msg === "OK") {
            this.tips = "搜索到班级：" + data.data.className;
            this.tipsColor = '#1c7eff';
          } else if (data.msg === "NOT_FOUND") {
            this.tips = "未搜索到classId为“" + this.importClassId + "”的班级";
            this.tipsColor = 'red';
          }
        })
        .catch(() => {
          this.$toast({
            message: "服务器出错啦QAQ",
            duration: 1000
          });
        });
    }
  }
};
</script>

<style src="./create_class.css" scoped></style>
