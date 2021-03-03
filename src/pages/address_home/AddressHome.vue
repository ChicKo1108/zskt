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
      <div @click="goCreateClass" class="btn">
        <img src="@/images/add.png" alt="" />
        创建班级
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
      <li class="list_item">
        <div class="item_header">
          <div class="class_avatar">
            <img src="@/images/default_avatar.png" alt="" />
          </div>
          <div class="class_info" @click="viewInfoPage('1231123', true)">
            <div class="class_info_detail">
              <div class="name">2017级软件工程1班</div>
              <div class="num">共32人</div>
            </div>
            <div class="link">班级群</div>
          </div>
        </div>
        <!-- 学生列表 -->
        <ul class="student_list">
          <li class="stu_item">
            <div class="stu_avatar">
              <img src="@/images/default_avatar.png" alt="" />
            </div>
            <div class="class_info" @click="viewInfoPage('1231123')">
              <div class="class_info_detail">
                <div class="name" style="font-size: 14px">王小明</div>
                <div class="num">P171713280</div>
              </div>
              <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="" />
              </div>
            </div>
          </li>
          <li class="stu_item">
            <div class="stu_avatar">
              <img src="@/images/default_avatar.png" alt="" />
            </div>
            <div class="class_info" @click="viewInfoPage('1231123')">
              <div class="class_info_detail">
                <div class="name" style="font-size: 14px">王小明</div>
                <div class="num">P171713280</div>
              </div>
              <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="" />
              </div>
            </div>
          </li>
          <li class="stu_item">
            <div class="stu_avatar">
              <img src="@/images/default_avatar.png" alt="" />
            </div>
            <div class="class_info" @click="viewInfoPage('1231123')">
              <div class="class_info_detail">
                <div class="name" style="font-size: 14px">王小明</div>
                <div class="num">P171713280</div>
              </div>
              <div class="arrow">
                <img src="@/images/arrow_right_black.png" alt="" />
              </div>
            </div>
          </li>
        </ul>
        <div class="show_all_stu">
          展开全部班级成员
          <img src="@/images/arrow_down_blue.png" alt="" />
        </div>
      </li>
    </ul>
    <home-footer :index="3"></home-footer>
  </div>
</template>

<script>
import HomeFooterVue from "../../components/home_footer/HomeFooter.vue";
import ZsNavBarVue from "../../components/zs_nav_bar/ZsNavBar.vue";
import classAPI from '../../api/classAPI';
export default {
  components: { ZsNavBar: ZsNavBarVue, HomeFooter: HomeFooterVue },
  data() {
    return {
      shouldShowMenu: false
    };
  },
  mounted() {
    classAPI.getMyClassList().then(({data}) => {
      console.log(data);
    });
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
      this.$router.push('/createClass');
    }
  }
};
</script>

<style src="./AddressHome.css" scoped></style>
