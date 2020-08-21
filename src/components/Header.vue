<template>
  <div class="home-header" id>
    <div class="home-header-left">
      <img src="../assets/heima.png" alt srcset />
      <span>电商后台管理系统</span>
    </div>
    <el-button type="primary">退出</el-button>
  </div>
</template>
<style lang="less" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    span {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
