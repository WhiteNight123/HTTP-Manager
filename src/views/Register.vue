<template>
  <div class="register-container">
    <el-form
      :model="registerForm"
      :rules="registerRules"
      ref="registerFormRef"
      class="register-form"
      label-width="80px"
      :label-position="right"
    >
      <h2>注册</h2>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="请输入邮箱"
          :prefix-icon="Message"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model="registerForm.name"
          placeholder="请输入用户名"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          placeholder="请确认密码"
          :prefix-icon="Lock"
          show-password
        ></el-input>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="goToLogin">去登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userRegister } from "../api/user";
import { Message, User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const registerForm = ref({});
const registerRules = ref({
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: "blur",
    },
  ],
  name: [
    { required: true, message: "Please enter your username", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "用户名长度应该在 2 到 20 个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "密码长度应该在 6 到 18 个字符之间",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: "密码应该由数字和字母组成",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please confirm your password",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
const router = useRouter();
const registerFormRef = ref();

const register = async () => {
  try {
    await registerFormRef.value.validate().catch((error) => {
      console.log("error:", error);
      if (error.email) throw error.email[0].message;
      if (error.name) throw error.name[0].message;
      if (error.password) throw error.password[0].message;
      if (error.confirmPassword) throw error.confirmPassword[0].message;
      throw error;
    });
    console.log("注册 form:", registerForm.value);
    const { email, name, password } = registerForm.value;
    const newUser = { email, name, password };
    const response = await userRegister(newUser);
    console.log("注册 response:", response);
    ElMessage.success("注册成功");
    router.push({
      name: "Login",
      query: {
        email: email,
      },
    });
  } catch (error) {
    console.log("注册 error:", error);
    ElMessage.error(error);
  }
};

const goToLogin = () => {
  router.push("Login");
};
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-form {
  width: 350px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
