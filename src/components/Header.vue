<template>
  <el-header class="header">
    <span class="header-left">
      <img class="logo" src="../assets/img/vue.svg" alt="Logo" />
    </span>
    <span class="header-right">
      <el-switch
        v-model="darkMode"
        size="medium"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        @change="toggleDark"
      >
      </el-switch>
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
</template>

<script setup>
import { ref } from "vue";
import { ArrowDown, Moon, Sunny } from "@element-plus/icons-vue";
import { useStore } from "../store/user";
import { storeToRefs } from "pinia";
const store = useStore();
let { userName } = storeToRefs(store);
const activeMenu = ref("dashboard");
const darkMode = ref(false);
const nickname = ref(userName);
import request from "../api/request";
import { ElMessage } from "element-plus";
import router from "../router";

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const toggleDarkMode = () => {
  ElMessage({
    message: darkMode.value ? "夜间模式" : "白天模式",
    type: "success",
  });
  toggleDark();
};

const handleDropdownCommand = (command) => {
  if (command === "profile") {
    // 处理个人资料的点击事件
    ElMessage({
      message: "个人资料",
      type: "success",
    });
    // 你可以在这里跳转到个人资料页面
    router.push("/my");
  } else if (command === "logout") {
    // 处理退出登录的点击事件
    store.clearToken();
    request.defaults.headers.common["Authorization"] = "";
    localStorage.setItem("token", "");
    router.push("/login");
    ElMessage.warning("退出登录");
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
