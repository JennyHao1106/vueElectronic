<template>
  <div class="home-aside">
    <div class="home-aside-toggle" @click="toggleMenu">
      <i type :class="'toggle-button '+toggleClass"></i>
    </div>
    <el-menu
      background-color="#333744"
      text-color="white"
      active-text-color="#409EFF"
      unique-opened
      :collapse="toggleFlag"
      :collapse-transition="false"
      :default-active="activePath"
      router
    >
      <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
        <template slot="title">
          <i :class="'iconfont icon-'+iconsList[item.order-1]"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item
          :index="subItem.path"
          v-for="subItem in item.children"
          :key="subItem.id"
          @click="saveCurrentPath(subItem.path,item.authName,subItem.authName)"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{subItem.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.el-menu,.home-aside {
  width: 100%;
  border-right:0px;
}
.iconfont {
  margin-right: 5px;
}
.home-aside-toggle {
  height: 30px;
  display: flex;
  background: #475163;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .toggle-button {
    color: #fff;
    font-size: 24px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      menuList: [],
      iconsList: ["users", "tijikongjian", "shangpin", "danju", "baobiao"],
      toggleClass: "el-icon-s-fold",
      toggleFlag: false,
      activePath: ""
    };
  },
  created() {
    this.getMenuList();
    this.activePath = sessionStorage.getItem("activePath");
  },

  methods: {
    getMenuList() {
      this.$http
        .get("menus")
        .then(res => {
          this.menuList = res;
        })
        .catch(err => {});
    },
    toggleMenu() {
      this.toggleFlag = !this.toggleFlag;

      this.$bus.$emit("on-collapse", this.toggleFlag);

      this.toggleFlag
        ? (this.toggleClass = "el-icon-s-unfold")
        : (this.toggleClass = "el-icon-s-fold");
    },
    saveCurrentPath(path, itemName, subItemName) {
      this.activePath = path;
      let nameArr = [];
      nameArr.push(itemName);
      nameArr.push(subItemName);
      this.$bus.$emit("on-collapse-breadname", nameArr);
      sessionStorage.setItem("activePath", path);
    }
  }
};
</script>

