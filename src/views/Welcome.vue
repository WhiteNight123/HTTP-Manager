<template>
  <el-button class="my-button" @click="goLogin">去登录</el-button>
  <h1>欢迎使用HTTP-接口管理平台</h1>
  <img src="../assets/img/welcome.svg" alt="logo" />
</template>
<script setup>
import router from "../router";
const goLogin = () => {
  router.push("/login");
};
</script>
<style scoped>
.my-button {
  display: block;
  margin-left: auto;
  margin-right: 10px;
}

img {
  width: 50%;
  margin: 0 auto;
  display: block;
}
h1 {
  margin-top: 100px;
  text-align: center;
  font-size: 32px;
}
</style>
