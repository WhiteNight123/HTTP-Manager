import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

//1. 创建axios对象
const service = axios.create();

//2. 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//3. 响应拦截器
service.interceptors.response.use(
  (response) => {
    //判断code码
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      ElMessage.error(response.data.msg);
    }
  },
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return Promise.reject(error.response.data.msg);
      } else if (error.response.data && error.response.data.msg) {
        return Promise.reject(error.response.data.msg);
      }
    }
    return Promise.reject(error);
  }
);

// 从localStorage中获取token
service.defaults.headers.common["Authorization"] =
  localStorage.getItem("token");

export default service;
