import request from "./request";

// 创建接口
export function createInterface(data) {
  return request({
    url: "/api/interface",
    method: "post",
    data,
  });
}

// 获取指定项目的所有接口
export function getInterfaces(projectId) {
  return request({
    url: `/api/interface/project/${projectId}`,
    method: "get",
  });
}

// 获取指定接口
export function getInterface(interfaceId) {
  return request({
    url: `/api/interface/${interfaceId}`,
    method: "get",
  });
}

// 修改指定接口
export function updateInterface(interfaceId, data) {
  return request({
    url: `/api/interface/${interfaceId}`,
    method: "put",
    data,
  });
}

// 删除指定接口
export function deleteInterface(interfaceId) {
  return request({
    url: `/api/interface/${interfaceId}`,
    method: "delete",
  });
}

// 查询历史版本
export function getHistory(interfaceId) {
  return request({
    url: `/api/interface/${interfaceId}/history/`,
    method: "get",
  });
}

// 回滚历史版本
export function rollbackHistory(interfaceId, historyId) {
  return request({
    url: `/api/interface/${interfaceId}/history/${historyId}`,
    method: "put",
  });
}

// 上传文件
export function uploadFile(formData) {
  return request({
    url: "/api/upload",
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [
      function () {
        return formData;
      },
    ],
    data:formData,
  });
}

// 添加Mock接口
export function addMock(data) {
  return request({
    url: "/mock/add",
    method: "post",
    data,
  });
}
