<template>
  <div>
    <el-container style="height: 100vh">
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside width="100px">
          <!-- 侧边栏内容 -->
          <el-menu
            class="el-menu-vertical"
            default-active="Dashboard"
            @select="handleMenuSelect"
          >
            <el-menu-item index="Dashboard">仪表盘</el-menu-item>
            <el-menu-item index="Interfaces">接口管理</el-menu-item>
            <el-menu-item index="Members">用户管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="padding: 5px; width: 100%">
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
import { ElMessage } from "element-plus";
import router from "../router";
import { projectStore } from "../store/project";
const store = projectStore();
const activeMenu = ref("dashboard");

const handleMenuSelect = (index) => {
  activeMenu.value = index;
  router.push(index);
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    ElMessage.error("Please log in first.");
    router.push("/login");
  }
  const id = store.getProjectId;
  if (!id) {
    ElMessage.info("Please select a project first.");
    router.push("/projects");
  }
});
</script>

<style></style>
