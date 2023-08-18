<template>
  <div class="user-profile">
    <el-card class="profile-card">
      <div slot="header" class="card-header">
        {{ editing ? "编辑信息" : "个人信息" }}
      </div>
      <div class="card-content">
        <el-avatar
          :src="editing ? editedInfo.avatar : userInfo.avatar"
          size="100px"
        ></el-avatar>
        <h2>{{ editing ? editedInfo.name : userInfo.name }}</h2>
        <p>{{ editing ? editedInfo.email : userInfo.email }}</p>
        <p>{{ editing ? editedInfo.bio : userInfo.bio }}</p>

        <el-button v-if="!editing" @click="startEditing">编辑</el-button>
        <el-button v-else @click="saveChanges">保存</el-button>

        <el-form v-if="editing" :model="editedInfo" class="edit-form">
          <el-form-item label="姓名">
            <el-input v-model="editedInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editedInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="editedInfo.bio"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "vue";

const userInfo = ref({
  avatar: "../assets/img/vue.svgg",
  name: "用户姓名",
  email: "用户邮箱",
  bio: "用户简介",
});

const editedInfo = ref({ ...userInfo.value });
const editing = ref(false);

// 模拟从服务器获取用户信息
// 你可以根据实际情况修改这部分代码
// 例如，可以使用Axios或其他HTTP库来获取真实数据
async function fetchUserInfo() {
  // 模拟异步获取用户信息
  await new Promise((resolve) => setTimeout(resolve, 1000));
  userInfo.value = {
    avatar: "../../public/vite.svg",
    name: "John Doe",
    email: "john@example.com",
    bio: "Web开发者,喜欢编写代码。",
  };
}

fetchUserInfo(); // 获取用户信息

function startEditing() {
  editedInfo.value = { ...userInfo.value };
  editing.value = true;
}

function saveChanges() {
  userInfo.value = { ...editedInfo.value };
  editing.value = false;
}
</script>

<style>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.profile-card {
  width: 400px;
}

.card-header {
  font-size: 20px;
  font-weight: bold;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  margin-top: 10px;
}

p {
  margin: 5px 0;
}
.el-button {
  margin-top: 10px;
}
.edit-form {
  margin-top: 20px;
}
</style>
