<template>
  <div class id>
    HOME 组件
    <el-button @click="logout"></el-button>
  </div>
</template>
<style>
/* pageFullScreen在index.css */
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
