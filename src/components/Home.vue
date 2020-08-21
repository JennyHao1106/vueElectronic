<template>
  <el-container class="home-container">
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <home-aside ref="homeSide"></home-aside>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><router-link to="/welcome">首页</router-link></el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in breadName" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-container class="main-content">
          <router-view></router-view>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.main-content{
  background-color: #fff;
  margin: 15px 0px;
  border-radius: 2px;
  /* height: 100%; */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  padding: 15px;
}
</style>
<script>
import homeHeader from "./Header";
import homeAside from "./Aside";
export default {
  components: {
    homeHeader,
    homeAside
  },
  computed: {},
  data() {
    return {
      isCollapse: false, //默认打开侧边栏
      breadName: []
    };
  },
  created() {
    this.$bus.$on("on-collapse", mes => {
      this.isCollapse = mes;
      //   console.log(this.isCollapse);
    });
    this.$bus.$on("on-collapse-breadname", msg => {
      this.breadName = msg;
    });
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
