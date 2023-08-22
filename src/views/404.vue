<template>
  <el-button class="my-button" @click="goLogin">回到首页</el-button>
  <img src="../assets/img/404.svg" alt="logo" />
</template>

<script setup>
import router from "../router";
const goLogin = () => {
  router.push("/home");
};
</script>

<style scoped>
.my-button {
  display: block;
  margin-left: auto;
  margin-right: 10px;
}

img {
  width: 60%;
  margin: 0 auto;
  display: block;
}
h1 {
  margin-top: 100px;
  text-align: center;
  font-size: 32px;
}
</style>
