<template>
  <div class="address_home">
    <zs-nav-bar title="通讯录" type="simple"></zs-nav-bar>
    <div
      @click="toggleMenu"
      class="menu_btn"
      :style="{ transform: shouldShowMenu ? 'rotate(45deg)' : 'rotate(0deg)' }"
    >
      <img src="@/images/plus.png" alt="" />
    </div>
    <div v-if="shouldShowMenu" class="menu">
      <div
        v-if="userInfo.role === 'TEACHER'"
        @click="goCreateClass"
        class="btn"
      >
        <img src="@/images/add.png" alt="" />
        创建班级
      </div>
      <div v-else @click="showSearchClassModel" class="btn">
        <img src="@/images/add.png" alt="" />
        加入班级
      </div>
      <div @click="closeMenu" class="btn">
        <img src="@/images/scan.png" alt="" />
        扫一扫
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search_bar">
      <div class="search_box">
        <img src="@/images/search.png" alt="" />
        <input type="text" placeholder="搜索" />
      </div>
    </div>
    <!-- 班级聚合chunk -->
    <ul class="class_chunk_list">
      <li
        v-for="(cls, idx) in classList"
        :key="cls.id"
        :hidden="cls.needHide ? idx >= 3 : false"
        class="list_item"
      >
        <div class="item_header">
          <div class="class_avatar">{{ cls.className }}</div>
          <div class="class_info" @click="viewInfoPage(cls.id, true)">
            <div class="class_info_detail">
              <div class="name">{{ cls.className }}</div>
              <div class="num">共{{ cls.studentList.length }}人</div>
            </div>
            <div class="link">班级群</div>
          </div>
        </div>
        <!-- 学生列表 -->
        <ul v-for="stu in cls.studentList" :key="stu.id" class="student_list">
          <li class="stu_item">
            <div class="stu_avatar">
              <img
                :src="stu.avatar || require('@/images/default_avatar.png')"
                alt=""
              />
            </div>
            <div class="class_info" @click="viewInfoPage(stu.id)">
              <div class="class_info_detail">
                <div class="name" style="font-size: 14px">
                  {{ stu.realName }}
                </div>
                <div class="num">{{ stu.sno || "未填写学号" }}</div>
              </div>
              <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="" />
              </div>
            </div>
          </li>
        </ul>
        <div v-if="cls.studentList.length > 3" class="show_all_stu">
          展开全部班级成员
          <img src="@/images/arrow_down_blue.png" alt="" />
        </div>
      </li>
    </ul>
    <home-footer :index="3"></home-footer>
    <transition name="fade">
      <div
        v-if="shouldShowModal"
        @click="closeModal"
        class="search_class_modal"
      >
        <div @click.stop="" class="search_class_wrap">
          <div class="title">搜索班级</div>
          <div class="tip_info">请输入班级名或班级Id</div>
          <div class="input_box">
            <input v-model="searchString" type="text" />
          </div>
          <div v-if="searchResultList.length" class="result_box">
            <div class="result_title">搜索到以下班级</div>
            <div class="result_list">
              <div
                v-for="cls in searchResultList"
                :key="cls.id"
                class="result_class_item"
                @click="viewInfoPage(cls.id, true)"
              >
                <div class="class_avatar">{{ cls.className }}</div>
                <div class="class_item_main">
                  <div class="class_name">{{ cls.className }}</div>
                  <div class="class_info">
                    {{ cls.school }}·{{ cls.college }}
                  </div>
                </div>
                <div class="arrow">
                  <img src="../../images/arrow_right_gray.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="showErrorTip" class="error_tip">
            未找到到相关班级，请重试
          </div>
          <div class="btns">
            <div @click="closeModal" class="btn">取消</div>
            <div @click="doSearchClass" class="btn">搜索</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import HomeFooterVue from "../../components/home_footer/HomeFooter.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import classAPI from "../../api/classAPI";
import UserAPI from "../../api/userAPI";
export default {
  components: { ZsNavBar: ZsNavBarVue, HomeFooter: HomeFooterVue },
  data() {
    return {
      shouldShowMenu: false,
      classList: [],
      userInfo: {},
      shouldShowModal: false,
      showErrorTip: false,
      searchString: "",
      searchResultList: []
    };
  },
  mounted() {
    Promise.all([classAPI.getMyClassList(), UserAPI.getMyUserInfo()]).then(
      (res) => {
        res[0].data.forEach((cls) => (cls.needHide = true));
        this.classList = res[0].data;
        this.userInfo = res[1].data;
      }
    );
  },
  methods: {
    showMenu() {
      this.shouldShowMenu = true;
    },
    closeMenu() {
      this.shouldShowMenu = false;
    },
    toggleMenu() {
      if (this.shouldShowMenu) {
        this.closeMenu();
      } else {
        this.showMenu();
      }
    },
    viewInfoPage(id, isClassMode) {
      this.$router.push(
        `/infoPage?id=${id}&mode=${isClassMode ? "class" : "stu"}`
      );
    },
    goCreateClass() {
      this.closeMenu();
      this.$router.push("/createClass");
    },
    showSearchClassModel() {
      this.closeMenu();
      this.shouldShowModal = true;
    },
    closeModal() {
      this.shouldShowModal = false;
      this.searchString = "";
      this.showErrorTip = false;
      this.searchResultList = [];
    },
    doSearchClass() {
      if (!this.searchString) {
        return;
      }
      classAPI.searchClass(this.searchString).then(({ data }) => {
        this.searchResultList = data;
        this.showErrorTip = !data.length;
      });
    }
  }
};
</script>

<style src="./AddressHome.css" scoped></style>
