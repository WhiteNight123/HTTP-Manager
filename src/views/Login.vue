<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      ref="loginFormRef"
      class="login-form"
      :rules="loginRules"
    >
      <h2>Login</h2>
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="loginForm.email"
          placeholder="Enter your email"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="Enter your password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="login" class="login-button"
            >Login</el-button
          >
          <el-button @click="goToRegister" class="register-button"
            >Go to Register</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/user";
import { userLogin } from "../api/user";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import request from "../api/request";
import { onMounted } from "vue";

const loginForm = ref({
  email: "",
  password: "",
  name: "  ",
});
const loginRules = ref({
  email: [
    { required: true, message: "Please input email", trigger: "blur" },
    {
      type: "email",
      message: "Please input correct email address",
      trigger: ["blur"],
    },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
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
    console.log(response.data.token);
    request.defaults.headers.common["Authorization"] = response.data.token;
    ElMessage({
      message: "Login success",
      type: "success",
    });
    router.push("/project");
  } catch (error) {
    ElMessage({
      message: error,
      type: "error",
    });
  }
};

const goToRegister = () => {
  console.log("Go to Register");
  router.push("/register"); // Assuming you have a 'Register' route
};
// 当前路径带有email参数，将参数填入email
onMounted(() => {
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
