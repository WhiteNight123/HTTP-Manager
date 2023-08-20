<template>
  <div>
    <Header></Header>
    <el-container>
      <el-aside width="150px">
        <!-- 侧边栏内容 -->
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          @select="handleMenuSelect"
        >
          <el-menu-item index="dashboard">仪表盘</el-menu-item>
          <el-menu-item index="interfaces">接口管理</el-menu-item>
          <el-menu-item index="users">用户管理</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 头部内容 -->
          <h1>后台管理系统</h1>
        </el-header>
        <el-main>
          <!-- 主要内容区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../components/Header.vue";
import router from "../router";
import { useStore } from "../store/user";
import { storeToRefs } from "pinia";
const store = useStore();
const activeMenu = ref("dashboard");
import { ElMessage } from "element-plus";

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  console.log(index);
  router.push(`/${index}`);
};
</script>
<style></style>
