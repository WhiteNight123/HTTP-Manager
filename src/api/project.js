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
export function getProject(projectId) {
  return request({
    url: `/api/project/${projectId}`,
    method: "get",
  });
}

// 修改指定项目
export function updateProject(projectId, data) {
  return request({
    url: `/api/project/${projectId}`,
    method: "patch",
    data,
  });
}

// 删除指定项目
export function deleteProject(projectId) {
  return request({
    url: `/api/project/${projectId}`,
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
