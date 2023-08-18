<template>
  <div class="register-container">
    <el-form
      :model="registerForm"
      :rules="registerRules"
      ref="registerFormRef"
      class="register-form"
    >
      <h2>Register</h2>
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="Enter your email"
        ></el-input>
      </el-form-item>
      <el-form-item label="Username" prop="name">
        <el-input
          v-model="registerForm.name"
          placeholder="Enter your username"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          placeholder="Enter your password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          placeholder="Confirm your password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="register">Register</el-button>
          <el-button @click="goToLogin">Go to Login</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userRegister } from "../api/user";

const registerForm = ref({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const registerRules = ref({
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  name: [
    { required: true, message: "Please enter your username", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "Username length should be between 2 and 20 characters",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "Password length should be between 6 and 18 characters",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: "Password should only contain letters and numbers",
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
          callback(new Error("The two passwords do not match"));
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
    const valid = await registerFormRef.value.validate();
    if (!valid) return;
    console.log("注册 form:", registerForm.value);
    const { email, name, password } = registerForm.value;
    const newUser = { email, name, password };
    const response = await userRegister(newUser);
    console.log("注册 response:", response);
    router.push({
      name: "Login",
      query: {
        email: email,
      },
    });
  } catch (error) {
    console.error("注册 error:", error);
  }
};

const goToLogin = () => {
  router.push({
    name: "Login",
    query: {
      email: "111@qq.com",
    },
  });
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
</style>
