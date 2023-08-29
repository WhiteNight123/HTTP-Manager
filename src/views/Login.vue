<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      ref="loginFormRef"
      class="login-form"
      :rules="loginRules"
    >
      <h2>HTTP接口管理平台</h2>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="loginForm.email"
          placeholder="请输入邮箱"
          :prefix-icon="Message"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          show-password
        ></el-input>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="login" class="login-button"
          >登录</el-button
        >
        <el-button @click="goToRegister" class="register-button"
          >去注册</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/user";
import { userLogin } from "../api/user";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Message, Lock } from "@element-plus/icons-vue";
import request from "../api/request";
import { onMounted } from "vue";

const loginForm = ref({});
const loginRules = ref({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur"],
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const loginFormRef = ref();
const router = useRouter();
const store = useStore();

const login = async () => {
  try {
    // 验证表单，如果成功继续，失败则返回
    await loginFormRef.value.validate().catch((error) => {
      console.log("Validate error:", error);
      if (error.email) throw error.email[0].message;
      if (error.password) throw error.password[0].message;
      throw error;
    });
    console.log("Login form:", loginForm.value);
    const response = await userLogin(loginForm.value);
    console.log("Login response:", response);
    store.setToken(response.data);
    localStorage.setItem("token", response.data.token);
    request.defaults.headers.common["Authorization"] = response.data.token;
    ElMessage.success("登录成功");
    router.push("/projects");
  } catch (error) {
    ElMessage.error(error);
    console.log("Login error:", error);
  }
};

const goToRegister = () => {
  router.push("/register");
};

onMounted(() => {
  // 当前路径带有email参数，将参数填入email
  if (router.currentRoute.value.query.email) {
    loginForm.value.email = router.currentRoute.value.query.email;
  }
});
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
.button-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
