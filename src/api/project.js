import request from "./request";

// 创建项目
export function createProject(data) {
  return request({
    url: "/api/project",
    method: "post",
    data,
  });
}

// 获取该用户的所有项目
export function getProjects() {
  return request({
    url: "/api/project",
    method: "get",
  });
}

// 获取指定项目
export function getProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: "get",
    data,
  });
}

// 修改指定项目
export function updateProject(id, data) {
  return request({
    url: `/api/project/${id}`,
    method: "put",
    data,
  });
}

// 删除指定项目
export function deleteProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: "delete",
  });
}

// 项目添加成员
export function addMember(data) {
  return request({
    url: "/api/project/member",
    method: "post",
    data,
  });
}

// 项目更改用户权限
export function updateMember(data) {
  return request({
    url: "/api/project/member",
    method: "put",
    data,
  });
}

// 项目删除成员
export function deleteMember(data) {
  return request({
    url: "/api/project/member/del",
    method: "delete",
    data,
  });
}
