<template>
  <div class="user-profile">
    <el-card class="profile-card">
      <div slot="header" class="card-header">
        <el-icon class="el-icon--right" @click="goBack">
          <arrow-left />
        </el-icon>
        {{ editing ? "编辑信息" : "个人信息" }}
      </div>
      <div class="card-content">
        <el-avatar :src="imageUrl" size="large"></el-avatar>
        <h2>{{ editing ? editedInfo.name : userInfo.name }}</h2>
        <p>{{ editing ? editedInfo.email : userInfo.email }}</p>
        <p>{{ editing ? editedInfo.bio : userInfo.bio }}</p>
        <el-button v-if="!editing" @click="startEditing">编辑</el-button>
        <el-button v-else @click="saveChanges">保存</el-button>
        <el-form
          v-if="editing"
          :model="editedInfo"
          class="edit-form"
          :rules="UpdateRules"
        >
          <el-form-item label="姓名">
            <el-input v-model="editedInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editedInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="editedInfo.bio"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="editedInfo.password"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { updateUserInfo, getUserInfo } from "../api/user";
import { useStore } from "../store/user";
import { storeToRefs } from "pinia";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
let { userId } = storeToRefs(store);
const imageUrl = ref("https://avatars.githubusercontent.com/u/52623028?v=4");
const userInfo = ref({
  name: "用户姓名",
  email: "用户邮箱",
  bio: "用户简介",
});
const UpdateRules = ref({
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
});
const editedInfo = ref({ ...userInfo.value, password: "" });
const editing = ref(false);

const goBack = () => {
  console.log("goBack");
  router.go(-1);
};
const getUserInfo1 = async () => {
  try {
    console.log("id:", userId.value);
    const response = await getUserInfo(userId.value);
    userInfo.value = response.data;
    ElMessage.success("获取用户信息成功");
  } catch (error) {
    console.log(error);
    ElMessage.error(error);
  }
};
getUserInfo1();
function startEditing() {
  editing.value = true;
  editedInfo.value = { ...userInfo.value };
}
const saveChanges = async () => {
  try {
    console.log("id:", userId.value);
    await updateUserInfo(userId.value, editedInfo.value);
    userInfo.value = editedInfo.value;
    editing.value = false;
    ElMessage.success("保存成功");
  } catch (error) {
    ElMessage.error(error);
  }
};
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
