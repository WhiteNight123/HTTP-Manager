<template>
  <div>
    <el-header class="header">
      <span class="header-left">
        <img class="logo" src="../assets/img/vue.svg" alt="Logo" />
      </span>
      <span class="header-right">
        <el-switch
          v-model="darkMode"
          active-text="夜间"
          inactive-text="白天"
          @change="toggleDarkMode"
        />
        <el-dropdown trigger="click" @command="handleDropdownCommand">
          <span class="nickname"
            >{{ nickname }}
            <el-icon class="el-icon--right"> <arrow-down /> </el-icon
          ></span>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <!-- 侧边栏内容 -->
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          @select="handleMenuSelect"
        >
          <el-menu-item index="dashboard">仪表盘</el-menu-item>
          <el-menu-item index="users">接口管理</el-menu-item>
          <el-menu-item index="products">用户管理</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 头部内容 -->
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
import { ArrowDown } from "@element-plus/icons-vue";
const activeMenu = ref("dashboard");
const darkMode = ref(false);
const nickname = ref("John Doe"); // 修改为您的昵称
import { ElMessage } from "element-plus";
const handleMenuSelect = (index) => {
  activeMenu.value = index;
  ElMessage({
    message: index,
    type: "success",
  });
};

const toggleDarkMode = () => {
  ElMessage({
    message: darkMode.value ? "夜间模式" : "白天模式",
    type: "success",
  });

  // 在这里可以切换夜间模式的样式或其他逻辑
};

const handleDropdownCommand = (command) => {
  if (command === "profile") {
    // 处理个人资料的点击事件
    ElMessage({
      message: "个人资料",
      type: "success",
    });
  } else if (command === "logout") {
    // 处理退出登录的点击事件
    ElMessage({
      message: "退出登录",
      type: "success",
    });
  }
};
</script>
<style>
/* 为了简单起见，您可以根据需要自行调整样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.nickname {
  margin-left: 10px;
  font-size: medium;
  margin-top: 6px;
}
</style>