import request from "./request";

// 登录
export function userLogin(data) {
  return request({
    url: "/api/auth",
    method:"post",
    data
  });
}

// 注册
export function userRegister(data) {
  return request({
    url: "/api/user",
    method: "post",
    data,
  });
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: "/api/user",
    method: "get",
  });
}

// 修改用户信息
export function updateUserInfo(id, data) {
  return request({
    url: `/api/user/${id}`,
    method: "put",
    data,
  });
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/api/user/${id}`,
    method: "delete",
  });
}

